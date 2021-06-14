<?php

namespace App\Http\Controllers\Diary;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use File;

class DiaryController extends Controller
{
    public function updateDiary(Request $request) {
        $rules = [
            'datetime' => 'required',
            'content' => 'required'
        ];

        $names = [];
        
        $messages = [];

        $this->validate($request, $rules, $messages, $names);

        if($request->props){
            if(!$request->props['diary_id']){
                $diary_id = str_replace('-', '', $request->datetime);
                $diary_id = preg_replace('/[^A-Za-z0-9\-]/', '', $diary_id);
            } else {
                $diary_id = $request->props['diary_id'];
            }
        } else {
            $diary_id = str_replace('-', '', $request->datetime);
            $diary_id = preg_replace('/[^A-Za-z0-9\-]/', '', $diary_id);
        }

        $count = 0;
        $doc_arr = [];

        if(sizeOf($request->file) > 0){
            foreach($request->file as $file){
                $file_ = $file['base64'];
                $data = substr($file_, strpos($file_, ',') + 1);
                $file_ = base64_decode($data);

                if(strpos($file['type'], 'image') !== false){
                    $safeName = $diary_id . '_' . $count . '.'.'png';
                    file_put_contents(public_path().'/storage/'.$safeName, $file_);
                    $count = $count + 1;

                    array_push($doc_arr, $safeName);
                } 

                if(strpos($file['type'], 'pdf') !== false) {
                    $safeName = $diary_id . '_' . str_replace(' ', '_', $file['name']) . '_' . $count . '.'.'pdf';
                    file_put_contents(public_path().'/storage/'.$safeName, $file_);
                    $count = $count + 1;

                    array_push($doc_arr, $safeName);
                }
            }
        }

        if(!$request->props){
            $result = DB::table('diary')->insert([
                'datetime' => $request->datetime,
                'content' => $request->content,
                'title' => $request->title,
                'diary_id' => $diary_id,
                'docs' => json_encode($doc_arr),
                'created_on' => date('Y-m-d'),
                'modified_on' => date('Y-m-d')
            ]);
        } else {
            $result = DB::table('diary')
                ->where('id', $request->props['id'])
                ->update([
                    'datetime' => $request->datetime,
                    'content' => $request->content,
                    'diary_id' => $diary_id,
                    'docs' => json_encode($doc_arr),
                    'title' => $request->title,
                    'modified_on' => date('Y-m-d')
                ]);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => $result
        ]);
    }

    public function getDiary() {
        $result = DB::table('diary')
            ->selectRaw('id, title, datetime, LEFT(content,300) as content, diary_id, docs')
            ->orderBy('datetime', 'desc')
            ->get();
        
        foreach($result as &$res){
            $docs = json_decode($res->docs);
            if($docs){
                foreach($docs as $doc){
                    $path = public_path() . '/storage/' . $doc;
                    if(File::exists($path)) {
                        $type = mime_content_type($path);
                        if(strpos($type, 'image') !== false){
                            $data = file_get_contents($path);
                            $base64 = 'data:' . $type . ';base64,' . base64_encode($data);

                            $res->docs = $base64;
                            break;
                        }
                    }
                }
            } else {
                $res->docs = "";
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => $result
        ]);
    }

    public function deleteEntry(Request $request) {
        $rules = [
            'id' => 'required'
        ];

        $names = [];
        
        $messages = [];

        $this->validate($request, $rules, $messages, $names);

        $docs = DB::table('diary')->select('docs')->where('id', $request->id)->first()->docs;

        if($docs){
            $docs = json_decode($docs);
            foreach($docs as $doc){
                $doc_path = public_path() . '/storage/' . $doc;
                if(File::exists($doc_path)) {
                    File::delete($doc_path);
                }
            }
        }

        $result = DB::table('diary')
            ->where('id', $request->id)
            ->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => $result
        ]);
    }

    public function getDiaryById(Request $request) {
        $rules = [
            'id' => 'required',
        ];

        $names = [];
        
        $messages = [];

        $this->validate($request, $rules, $messages, $names);

        $result = DB::table('diary')
            ->selectRaw('id, title, datetime, content, docs, diary_id')
            ->where('id', $request->id)
            ->first();

        $doc_arr = [];

        if($result){
            if($result->docs) {
                $docs = json_decode($result->docs);
                if(count($docs) > 0){
                    foreach($docs as $doc){
                        $path = public_path() . '/storage/' . $doc;
                        if(File::exists($path)) {
                            $type = mime_content_type($path);
                            $data = file_get_contents($path);
                            $base64 = 'data:' . $type . ';base64,' . base64_encode($data);

                            array_push($doc_arr, array(
                                'type' => $type,
                                'name' => str_replace($result->diary_id . '_', '', $doc),
                                'ori_name' => $doc,
                                'base64' => $base64
                            ));
                        }
                    }
                }
                
            }
        }

        $result->docs = $doc_arr;

        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => $result
        ]);
    }
}
