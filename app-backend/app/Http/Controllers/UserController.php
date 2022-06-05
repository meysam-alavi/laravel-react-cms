<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function changeAvatar(Request $request): JsonResponse
    {
        $request->validate([
            'avatar-org' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'avatar-slice' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048'
        ]);

        $result = ['data' => null, 'messages' => [], 'success' => false];

        $avatarOrg = $request->file('avatar-org');
        $avatarSlice = $request->file('avatar-slice');

        $userId = $request->user()->id;
        // public dir in storage/app/
        $userAvatarDir = '/public/users/' . $userId . '/images/avatar';

        $fileExtension = $avatarOrg->getClientOriginalExtension();
        $fileExtension = strtolower($fileExtension);

        $fileNameOrg = $userId . '_org.' . $fileExtension;
        $avatarOrgPath = $avatarOrg->storeAs($userAvatarDir, $fileNameOrg);

        $fileNameSlice = $userId . '_slice.' . $fileExtension;
        $avatarSlicePath = $avatarSlice->storeAs($userAvatarDir, $fileNameSlice);

        if ($avatarOrgPath && $avatarSlicePath) {
            $user = User::query()->find($userId);

            $user->avatar = $fileNameOrg;

            $user->save();

            $result['data'] = ['avatarOrg' => $fileNameOrg];
            $result['success'] = true;
        }

        // end image url for usage in client:
        // http://localhost:8000/storage/users/1/images/avatar/1_org.jpg

        return response()->json($result);
    }
}


/*
#filesystems.php
'cdn' => [
'driver' => 'local',
'root' => '/home/path/to/folder',
],


$path= '/home/path/to/folder/slider/';
 $file = $request->file;

 foreach($file as $photo) {
$ext = $photo->extension();
$name = uniqid();
$slide = 'sl-'.$name.'.'.$ext;
$original = 'org-'.$name.'.'.$ext;

//uploading the original file for later use
$photo->storeAs('slider', $original, 'cdn');

//creating a lone to crop
$photo->storeAs('slider', $slide, 'cdn');

//make Intervention Image instance
$slider = Image::make($path.$slide);

//changing them to specific pixel
$slider->fit(1583, 570);

//save the slider with new sizes by replacing the existing sl- prefix file
//but this save method would not be require in this case
$slider->save();

}


 */
