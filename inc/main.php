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

function get_mp3_list( $mp3_dir ) {
    $mp3_list = array();
    if ( !is_dir( $mp3_dir ) ) {
        @mkdir( $mp3_dir );
        @chmod( $mp3_dir, 0755 );
    }
    if ( $handle = opendir( $mp3_dir ) ) {
        while ( false !== ( $entry = readdir( $handle ) ) ) {
            if ( in_array( $entry, array( '.', '..' ) ) ) {
                continue;
            }
            $extension =  array_pop( explode( '.', $entry ) );
            if ( $extension != 'mp3' ) {
                continue;
            }
            $entry = strtolower( trim( str_replace( '.mp3', '', $entry ) ) );
            $id = str_replace( array( ' ', '_' ), '-', $entry );
            $name = ucwords( str_replace( '-', ' ', $id ) );
            $mp3_list[$id] = array(
                'file' => $entry,
                'name' => $name,
            );
        }
        closedir( $handle );
    }
    return $mp3_list;
}
