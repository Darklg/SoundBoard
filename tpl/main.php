<div class="buttons">
<?php
$mp3_list = get_mp3_list( $mp3_dir );
foreach ( $mp3_list as $id => $mp3 ) {
    echo '<button id="button_'.$id.'" data-mp3="'.$mp3_path.$mp3['file'].'"><span>'.$mp3['name'].'</span></button>';
}
?>
</div>
<p>
    <button id="shut">&cross;</button>
    <label><input type="checkbox" id="remixmode" /> Remix mode</label>
</p>
