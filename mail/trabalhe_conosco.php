<?
$name = $_POST{'name'};
$email = $_POST{'email'};
$fone = $_POST{'fone'};
$areainteresse = $_POST{'areainteresse'};
$message = $_POST['message'];
$curriculo = $_POST['curriculo'];


$email_message = "

Nome: ".$name."
Email: ".$email."
Fone: ".$fone."
Área Interesse: ".$areainteresse."
Mensagem: ".$message."
Curriculo: ".$curriculo."

";

mail ("rh@bioforte.com.br" , "Curriculo Site", $email_message);
header("location: ../mail-success.html");
?>
