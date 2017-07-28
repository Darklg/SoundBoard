<?php

/* ----------------------------------------------------------
  Variables
---------------------------------------------------------- */

$script_version = "0.9";
$mp3_path = 'assets/mp3/';
$mp3_dir = $base_dir . $mp3_path;
$tpl_dir = $base_dir . 'tpl/';

/* ----------------------------------------------------------
  User config
---------------------------------------------------------- */

$config_file = $base_dir . 'config.php';
if (file_exists($config_file)) {
    include $config_file;
}

if (!defined('PROJECT_NAME')) {
    define('PROJECT_NAME', 'Sound Board');
}

/* ----------------------------------------------------------
  Get MP3 list
---------------------------------------------------------- */

function get_mp3_list($mp3_dir) {
    $mp3_list = array();
    if (!is_dir($mp3_dir)) {
        @mkdir($mp3_dir);
        @chmod($mp3_dir, 0755);
    }
    if ($handle = opendir($mp3_dir)) {
        while (false !== ($entry = readdir($handle))) {
            if (in_array($entry, array('.', '..'))) {
                continue;
            }
            $file_details = explode('.', $entry);
            $extension = array_pop($file_details);
            if ($extension != 'mp3') {
                continue;
            }
            $mp3_list = get_mp3_details($entry, $mp3_dir, $mp3_list);
        }
        closedir($handle);
        ksort($mp3_list);
    }
    return $mp3_list;
}

/* ----------------------------------------------------------
  Get MP3 details
---------------------------------------------------------- */

function get_mp3_details($entry, $mp3_dir, $mp3_list) {

    // Get Initial ID
    $id = strtolower(trim(str_replace('.mp3', '', $entry)));
    $id = str_replace(array(' ', '_'), '-', $id);

    // Get Initial name
    $name = ucwords(str_replace('-', ' ', $id));

    $mp3_list[$id] = array(
        'file' => $entry,
        'name' => $name
    );
    return $mp3_list;
}
