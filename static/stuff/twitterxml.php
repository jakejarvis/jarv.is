<?php
header('Content-type: application/atom+xml');
?>
<rss xmlns:georss="http://www.georss.org/georss" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:twitter="http://api.twitter.com" version="2.0">
<channel>
<title>Twitter</title>
<description>Twitter Updates</description>
<link>http://twitter.com/<?php echo $twitter_username;?></link>
<atom:link type="application/rss+xml" href="http://jakejarvis.dreamhosters.com/twitterxml.php" rel="self"/>
<?php
$string = json_decode(file_get_contents("https://api.twitter.com/1/statuses/user_timeline.json?screen_name=jakejarvis&include_rts=false&exclude_replies=true&trim_user=true&count=200&since_id=334737454940700672"),$assoc = TRUE);
foreach($string as $items)
 {
 ?>
  <item>
    <title><?php echo $items['text'];?></title>
    <description><?php echo $items['text'];?></description>
    <pubDate><?php echo $items['created_at'];?></pubDate>
    <guid>http://twitter.com/jakejarvis/statuses/<?php echo $items['id'];?></guid>
    <link>http://twitter.com/jakejarvis/statuses/<?php echo $items['id'];?></link>
  </item>
<?php } ?>
 </channel>
</rss>