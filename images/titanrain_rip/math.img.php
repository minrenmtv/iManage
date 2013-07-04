<form method="post">
<textarea name="math" style="width:100%;height:50%"></textarea>
<input type="radio" name="way" value="a" checked /><label>Fetch [a] tag</label>
<input type="radio" name="way" value="img" /><label>Fetch [img] tag</label>
<input type="submit" value="Go"/>
</form>
<hr/>
<?php
if(isset($_POST)){
	$string = $_POST['math'];
	$matches = array();
	if($_POST['way']=='a'){
		preg_match_all('#<a\s+href=[\'"]([^\'"]+)\.(png|jpg|gif|jpeg|bmp|pds)[\'"]\s*(?:title=[\'"]([^\'"]+)[\'"])?\s*>((?:(?!</a>).)*)</a>#i',$string , $matches);
		foreach($matches[0] as $img){
			echo $img.'<br/>';
		}
	}else{
		preg_match_all('!http://[^?#]+\.(?:jpe?g|png|gif)!Ui' , $string , $matches);
		foreach($matches[0] as $img){
			echo '<a href="'.$img.'">'.$img.'</a><br/>';
		}
	}
}
?>

