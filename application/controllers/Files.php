<?php
use Sirius\Upload\Handler as UploadHandler;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local as Adapter;


class Files extends MY_Controller{
  var $filesystem,$directory;
  public function __construct(){
    parent::__construct();
    $this->directory='downloads/';
    $this->filesystem = new Filesystem(new Adapter($this->directory));
    $this->slidesystem = new Filesystem(new Adapter('slides/'));
  }

  function index_get(){

    $uploadHandler = new UploadHandler($this->directory);

    // set up the validation rules
    $uploadHandler->addRule('extension', ['allowed' => 'jpg', 'jpeg', 'png','pdf','doc','docx'],
    '{label} should be a valid file (jpg, jpeg, png,pdf,doc,docx)', 'Valid File');
    $uploadHandler->addRule('size', ['max' => '20M'], '{label} should have less than {max}', 'Valid File');
    $uploadHandler->addRule('imageratio', ['ratio' => 1], '{label} should be a sqare image', 'Valid File');

    $files = $this->filesystem->listContents();

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

  function index_post(){
    // var_dump($_FILES);die;
    $upload_name='file';
    $stream = fopen($_FILES[$upload_name]['tmp_name'], 'r+');
    if($this->filesystem->writeStream($_FILES[$upload_name]['name'], $stream)){

    };
    fclose($stream);

  }

  function slides_get(){
    $uploadHandler = new UploadHandler($this->directory);

    $files = $this->slidesystem->listContents();

    $resource = new Collection($files, function(array $file) {
      return [
        'uri'  => 'slides/'.$file['path'],
        'mime' => get_mime_by_extension($file['path']),
        'name'=>$file['path'],
        'path'=>$file['filename']

      ];
    });

    $data = $this->fractal->createData($resource)->toArray();

    $this->response($data);

  }

  function slides_post(){
    // var_dump($_FILES);die;
    $upload_name='file';
    $stream = fopen($_FILES[$upload_name]['tmp_name'], 'r+');
    if($this->slidesystem->writeStream($_FILES[$upload_name]['name'], $stream)){

    };
    fclose($stream);

  }
}