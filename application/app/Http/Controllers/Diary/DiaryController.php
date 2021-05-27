<?php

namespace App\Http\Controllers\Diary;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $img_arr = [];

        if(sizeOf($request->file) > 0){
            foreach($request->file as $file){
                $data = substr($file, strpos($file, ',') + 1);
                $file = base64_decode($data);
                $safeName = $diary_id . '_' . $count . '.'.'png';
                file_put_contents(public_path().'/storage/'.$safeName, $file);
                $count = $count + 1;
                array_push($img_arr, $safeName);
            }
        }

        if(!$request->props){
            $result = DB::table('diary')->insert([
                'datetime' => $request->datetime,
                'content' => $request->content,
                'title' => $request->title,
                'diary_id' => $diary_id,
                'images' => json_encode($img_arr),
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
                    'images' => json_encode($img_arr),
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
            ->selectRaw('id, title, datetime, LEFT(content,200) as content, diary_id')
            ->orderBy('datetime', 'desc')
            ->get();
        // $result = '555';
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
            ->selectRaw('id, title, datetime, content, images')
            ->where('id', $request->id)
            ->first();

        $img_arr = [];

        if($result){
            if($result->images) {
                $images = json_decode($result->images);
                    if(count($images) > 0){
                        foreach($images as $img){
                            $path = public_path() . '/storage/' . $img;
                            $type = pathinfo($path, PATHINFO_EXTENSION);
                            $data = file_get_contents($path);
                            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
                            array_push($img_arr, $base64);
                        }
                    }
                
            }
        }

        $result->images = $img_arr;

        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'data' => $result
        ]);
    }
}
