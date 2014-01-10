<?php

/* ----------------------------------------------------------
  Variables
---------------------------------------------------------- */

$mp3_path = 'assets/mp3/';
$mp3_dir = $base_dir .$mp3_path;
$tpl_dir = $base_dir . 'tpl/';

/* ----------------------------------------------------------
  Get MP3 list
---------------------------------------------------------- */

$mp3_list = array();

if ( $handle = opendir( $mp3_dir ) ) {
    while ( false !== ( $entry = readdir( $handle ) ) ) {
        if ( !in_array( $entry, array( '.', '..' ) ) ) {
            $name = str_replace( array( '-', '_', '.mp3' ), ' ', $entry );
            $name = ucwords( trim( $name ) );
            $mp3_list[] = array(
                'file' => $entry,
                'name' => $name,
            );
        }
    }
    closedir( $handle );
}

