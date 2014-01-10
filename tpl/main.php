<button id="shut">Shut</button>
<hr />
<?php
foreach ( $mp3_list as $mp3 ) {
    echo '<button data-mp3="'.$mp3_path.$mp3['file'].'">'.$mp3['name'].'</button>';
}
