<?
$email = $_POST{'email'};
$updates = $_POST{'updates'};
$news = $_POST{'news'};
$reseller = $_POST['reseller'];

$email_message = "

Email: ".$email."
Controle de Pragas: ".$updates."
Higienização Caixa D'água: ".$news."
Descupinização: ".$reseller."
";

mail ("atendimento@bioforte.com.br" , "Newslatter Site", $email_message);
header("location: ../mail-success.html");
?>
