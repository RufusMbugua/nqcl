<?php
use Sirius\Upload\Handler as UploadHandler;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local as Adapter;


class Downloads extends MY_Controller{
  var $filesystem,$directory;
  public function __construct(){
    parent::__construct();
    $this->directory='files/';
    $this->filesystem = new Filesystem(new Adapter($this->directory));
  }

  function index_get(){

    $uploadHandler = new UploadHandler('files/');

    // set up the validation rules
    $uploadHandler->addRule('extension', ['allowed' => 'jpg', 'jpeg', 'png','pdf','doc','docx'],
    '{label} should be a valid file (jpg, jpeg, png,pdf,doc,docx)', 'Valid File');
    $uploadHandler->addRule('size', ['max' => '20M'], '{label} should have less than {max}', 'Valid File');
    $uploadHandler->addRule('imageratio', ['ratio' => 1], '{label} should be a sqare image', 'Valid File');

    $files = $this->filesystem->listContents();
// echo'<pre>';print_r($files);die;
    $resource = new Collection($files, function(array $file) {
        return [
            'name' => [
              'name'=>$file['path'],
              'path'=>$file['filename']
            ],
            'uri'  => $this->directory.$file['path'],
            'mime' => get_mime_by_extension($file['path'])
        ];
    });

    $data = $this->fractal->createData($resource)->toArray();

    $this->response($data);
  }
}
