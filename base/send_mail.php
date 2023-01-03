
<?php
    /*
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/PHPMailer-master/src/Exception.php";
    require "PHPMailer/PHPMailer-master/src/PHPMailer.php";

    $mail = new PHPMailer(true); /* Создаем объект MAIL 
    $mail->CharSet = "UTF-8"; /* Задаем кодировку UTF-8 
    $mail->IsHTML(true); /* Разрешаем работу с HTML 

    $email = $_POST["email"]; /* Принимаем почту пользователя

    $body = file_get_contents($email_template);
    $body = str_replace('%email%', $email, $body);


    $mail->addAddress("rrodar@vk.com");   // Здесь введите Email, куда отправлять
    $mail->setFrom($email);
    $mail->Subject = "[Заявка с формы]";
    $mail->MsgHTML($body);

    /* Проверяем отправлено ли сообщение 
    if (!$mail->send()) {
        $message = "Ошибка отправки";
    } else {
        $message = "Данные отправлены!";
    }
    /* Возвращаем ответ 
    $response = ["message" => $message];

    header('Content-type: application/json');
    echo json_encode($response);


?> /*