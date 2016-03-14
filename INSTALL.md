# Installing NQCL

Authored by *Rufus Mbugua* [<mbuguarufus@gmail.com>]

If you'd like to set NQCL up on your computer you'll need to do the following:

## 1. Fork the project
The main integration of the system can be found [here](https://github.com/RufusMbugua/nqcl)

## 2. Clone the project
Copy the source code to your *WORKING DIRECTORY*

## 3. MySQL
Ensure that MySQL is installed in your machine.

Go over your specific OS installation instructions [here](https://dev.mysql.com/doc/refman/5.5/en/installing.html)

If you're using AIO distributions like [XAMPP](https://www.apachefriends.org/index.html) then you're already sorted on this front.

## 4. Dependencies
Update your composer dependencies by running the following command:
```
composer install && update
```
Update your bower dependencies by running the following command:
```
bower install && update
```



## 5. Configuration

An important step is connection you're instance of the application to MySQl.
This will involve editing the `database.php` file found here (starred):

```
application
├── cache
│   └── index.html
├── config
│   ├── autoload.php
│   ├── config.php
│   ├── constants.php
│  *├── database.php
...
```

and changing these values (starred):

```
$db['default'] = array(
	'dsn'	=> '',
	'hostname' => 'localhost',
   *'username' => 'root',
   *'password' => 'root',
   *'database' => 'nqcl',
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => TRUE,
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);
```

***

With this, you should be setup just fine. Incase of anything, open an issue and I'll do my best to address it. 🙂
