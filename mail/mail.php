<?
$name = $_POST{'name'};
$email = $_POST{'email'};
$fone = $_POST{'fone'};
$assunto = $_POST{'assunto'};
$message = $_POST['message'];

$email_message = "

Nome: ".$name."
Email: ".$email."
Fone: ".$fone."
Assunto: ".$assunto."
Mensagem: ".$message."
";

mail ("atendimento@bioforte.com.br" , "Mensagem Site", $email_message);
header("location: ../mail-success.html");
?>
