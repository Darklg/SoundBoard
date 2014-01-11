<div class="buttons">
<?php
foreach ( $mp3_list as $mp3 ) {
    echo '<button data-mp3="'.$mp3_path.$mp3['file'].'">'.$mp3['name'].'</button>';
}
?>
</div>
<p>
    <button id="shut">&cross;</button>
    <label><input type="checkbox" id="remixmode" /> Remix mode</label>
</p>