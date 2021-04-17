module.exports = {
  PARAM_ERROR: {
    'INVALID: $[1]': {
      'default': '$[1] is invalid',
      'ar': '$[1] غير صالح',
      'es': '$[1] no es válido',
      'pt': '$[1] é inválido'
    },
    'MISSING: $[1]': {
      'default': '$[1] is required',
      'ar': '$[1] مطلوب',
      'es': '$[1] es requerido',
      'pt': '$[1] é obrigatório'
    },
    'NUMERIC_LIMIT: $[1] $[2] $[3]': {
      'default': '$[1] should be numeric',
      'ar': 'يجب أن يكون $[1] رقميًا',
      'es': '$[1] debe ser numérico',
      'pt': '$[1] deve ser numérico'
    },
    'TEXT_LIMIT: $[1] $[2] $[3]': {
      'default': '$[1] string limit should be between $[2] to $[3]',
      'ar': 'يجب أن يتراوح حد السلسلة $[1] بين $[2] إلى $[3]',
      'es': 'El límite de cadena de $[1] debe estar entre $[2] a $[3]',
      'pt': 'O limite de $[1] deve estar entre $[2] a $[3]'
    },
    'NUMERIC: $[1]': {
      'default': '$[1] should be numeric',
      'ar': 'يجب أن يكون $[1] رقميًا',
      'es': '$[1] debe ser numérico',
      'pt': '$[1] deve ser numérico'
    },
    'STRING: $[1]': {
      'default': '$[1] should be string',
      'ar': 'يجب أن يكون $[1] خيطًا',
      'es': '$[1] debe ser una cadena',
      'pt': '$[1] deve ser string'
    },
    'PASSWORD: $[1] $[2]': {
      'default': 'Password lenght should be $[1] to $[2]',
      'ar': 'يجب أن يتراوح طول كلمة المرور من [1] إلى $[2]',
      'es': 'La longitud de la contraseña debe ser de $[1] a $[2]',
      'pt': 'O tamanho da senha deve ser de US $[1] a US $[2]'
    },
    'OTP': {
      'default': 'Please enter a valid OTP of 4 digit',
      'ar': 'يرجى إدخال OTP صالح من 4 أرقام',
      'es': 'Ingrese una OTP válida de 4 dígitos',
      'pt': 'Por favor insira um OTP válido de 4 dígitos'
    },
    'INVALID_LATITUDE': {
      'default': 'Please provide a valid latitude',
      'ar': 'يرجى تقديم خط عرض صالح',
      'es': 'Por favor proporcione una latitud válida',
      'pt': 'Por favor, forneça uma latitude válida'
    },
    'INVALID_LONGITUDE': {
      'default': 'Please provide a valid longitude',
      'ar': 'يرجى تقديم خط طول صالح',
      'es': 'Por favor proporcione una longitud válida',
      'pt': 'Por favor, forneça uma longitude válida'
    },
    'INVALID_BEARING': {
      'default': 'Please provide a valid bearing',
      'ar': 'يرجى تقديم تأثير صحيح',
      'es': 'Por favor proporcione un rumbo válido',
      'pt': 'Por favor, forneça um rolamento válido'
    },
    'INVALID_LATLONG: $[1]': {
      'default': 'Please provide a valid $[1]',
      'ar': 'يرجى تقديم مبلغ صالح $[1]',
      'es': 'Proporcione un $[1] válido',
      'pt': 'Por favor, forneça um $[1] válido'
    },
    'INVALID_FIELDNAME': {
      'default': 'Please enter a valid field name',
      'ar': 'الرجاء إدخال اسم حقل صالح',
      'es': 'Por favor ingrese un nombre de campo válido',
      'pt': 'Por favor insira um nome de campo válido'
    },
    'INVALID_ADDRESS: $[1] $[2] $[3]': {
      'default': 'Please provider a valid $[1] address between $[2] to $[3] length',
      'ar': 'يرجى توفير عنوان صالح $[1] يتراوح طوله بين $[2] إلى $[3]',
      'es': 'Proporcione una dirección válida de $[1] entre $[2] a $[3] de longitud',
      'pt': 'Forneça um endereço válido de $[1] entre $[2] a $[3] length'
    },
    'INVALID_RIDETYPE': {
      'default': 'Please provider a valid Ride Type',
      'ar': 'يرجى توفير نوع ركوب صالح',
      'es': 'Proporcione un tipo de viaje válido',
      'pt': 'Por favor, forneça um tipo de viagem válido'
    },
    'UNAUTHORIZED': {
      'default': 'Unauthorized access',
      'ar': 'دخول غير مرخص',
      'es': 'Acceso no autorizado',
      'pt': 'Acesso não autorizado'
    },
    'INVALID_PAYMENT_MODE': {
      'default': 'Please select a valid Payment Mode',
      'ar': 'يرجى اختيار طريقة دفع صالحة',
      'es': 'Seleccione un modo de pago válido',
      'pt': 'Por favor, selecione um modo de pagamento válido'
    }
  },
  ERROR: {
    'NOTEXIST: $[1]': {
      'default': 'Your $[1] does not exists',
      'ar': 'لديك $[1] غير موجود',
      'es': 'Su $[1] no existe',
      'pt': 'Seu $[1] não existe'
    },
    'EXIST: $[1]': {
      'default': 'Your $[1] already exists',
      'ar': 'لديك $[1] موجود بالفعل',
      'es': 'Tu $[1] ya existe',
      'pt': 'Seu $[1] já existe'
    },
    'OTP': {
      'default': 'You have entered a incorrect OTP',
      'ar': 'لقد أدخلت OTP غير صحيح',
      'es': 'Has ingresado una OTP incorrecta',
      'pt': 'Você digitou um OTP incorreto'
    },
    'PASSWORD': {
      'default': 'Please enter a valid password',
      'ar': 'الرجاء إدخال كلمة السر الصحيحة',
      'es': 'Por favor introduce una contraseña válida',
      'pt': 'por favor coloque uma senha válida'
    },
    'OTP_VERIFY': {
      'default': 'Please enter a valid OTP',
      'ar': 'يرجى إدخال OTP صالح',
      'es': 'Por favor ingrese una OTP válida',
      'pt': 'Por favor insira um OTP válido'
    },
    'NO_PROVIDER': {
      'default': 'No provider available in your location',
      'ar': 'لا يوجد مزود متاح في موقعك',
      'es': 'Ningún proveedor disponible en su ubicación',
      'pt': 'Nenhum provedor disponível em sua localização'
    },
    'OOPS': {
      'default': 'OOPS something went wrong',
      'ar': 'تبا شيء ما حدث بشكل خاطئ',
      'es': 'Huy! Algo salió mal',
      'pt': 'OOPS algo deu errado'
    },
    'NOT_ALPHA: $[1]': {
      'default': '$[1] is not alphabetical character',
      'ar': '$[1] ليس حرفًا أبجديًا',
      'es': '$[1] no es un carácter alfabético',
      'pt': '$[1] não é um caracter alfabético'
    },
    'INVALID_FIELDNAME': {
      'default': 'Please enter a valid field name',
      'ar': 'الرجاء إدخال اسم حقل صالح',
      'es': 'Por favor ingrese un nombre de campo válido',
      'pt': 'Por favor insira um nome de campo válido'
    },
    'STRIPE_CARD_ERROR': {
      'default': 'Card creation error',
      'ar': 'خطأ في إنشاء البطاقة',
      'es': 'Error de creación de tarjeta',
      'pt': 'Erro de criação de cartão'
    },
    'PASSWORD_EXISTS': {
      'default': 'Your password already exists. Please provide a new password',
      'ar': 'كلمة مرورك موجودة بالفعل يرجى تقديم كلمة مرور جديدة',
      'es': 'Tu contraseña ya existe. Por favor proporcione una nueva contraseña',
      'pt': 'Sua senha já existe. Por favor, forneça uma nova senha'
    },
    'NO_SERVICE': {
      'default': 'No service available in your location',
      'ar': 'لا توجد خدمة متاحة في موقعك',
      'es': 'No hay servicio disponible en su ubicación.',
      'pt': 'Nenhum serviço disponível em sua localização'
    },
    'BOOKING_UNAVAILABLE': {
      'default': 'All our drivers are currently busy. Please try after sometime',
      'ar': 'جميع السائقين لدينا مشغولون حاليا. يرجى المحاولة بعد مرور بعض الوقت',
      'es': 'Todos nuestros conductores están actualmente ocupados. Por favor intente después de algún tiempo',
      'pt': 'Todos os nossos drivers estão ocupados no momento. Por favor, tente depois de algum tempo'
    },
    'OTP_FAIL': {
      'default': 'Unable to send OTP. Please try after sometime.',
      'ar': 'غير قادر على إرسال OTP. يرجى المحاولة بعد مرور بعض الوقت.',
      'es': 'No se puede enviar OTP. Por favor intente después de algún tiempo.',
      'pt': 'Não é possível enviar o OTP. Por favor, tente depois de algum tempo.'
    },
    'UPDATE_ERROR: $[1]': {
      'default': 'Unable to update $[1] at this time. Please try again after sometime.',
      'ar': 'غير قادر على تحديث $[1] في هذا الوقت. من فضلك حاول مرة أخرى بعد بعض من الوقت.',
      'es': 'No se puede actualizar $[1] en este momento. Por favor intente nuevamente después de algún tiempo.',
      'pt': 'Não é possível atualizar $[1] neste momento. Por favor tente novamente depois de algum tempo.'
    },
    'SERVICE_NOT_AVAILABLE': {
      'default': 'Service not available at this time.',
      'ar': 'الخدمة غير متوفرة في هذا الوقت.',
      'es': 'Servicio no disponible en este momento.',
      'pt': 'Serviço não disponível no momento.'
    },
    'INVALID_RIDE': {
      'default': 'Please provide a valid ride type',
      'ar': 'يرجى تقديم نوع ركوب صحيح',
      'es': 'Proporcione un tipo de viaje válido',
      'pt': 'Por favor, forneça um tipo de viagem válido'
    },
    'INVALID_PROVIDER': {
      'default': 'Your provider Id is invalid',
      'ar': 'معرف المزود الخاص بك غير صالح',
      'es': 'Su ID de proveedor no es válido',
      'pt': 'Seu ID de provedor é inválido'
    },
    'FAILED: $[1]': {
      'default': '$[1] is Invalid',
      'ar': '$[1] غير صالح',
      'es': '$[1] no es válido',
      'pt': '$[1] é inválido'
    },
    'FAILED': {
      'default': 'Your Request has been Failed',
      'ar': 'تم فشل طلبك',
      'es': 'Su solicitud ha fallado',
      'pt': 'Sua solicitação foi reprovada'
    },
    'STRIPE_AC_ERROR': {
      'default': 'Your Stripe Account Creation has been Failed',
      'ar': 'أخفق إنشاء حساب الشريط',
      'es': 'Su creación de cuenta de Stripe ha fallado',
      'pt': 'Sua criação de conta de faixa foi falha'
    },
    'LOGINFAILED: $[1] $[2]': {
      'default': '$[1] and $[2] is Invalid',
      'ar': '$[1] و $[2] غير صالح',
      'es': '$[1] y $[2] no son válidos',
      'pt': '$[1] e $[2] são inválidos'
    },
    'NO_NEW_BOOKING': {
      'default': 'No new booking available',
      'ar': 'لا يوجد حجز جديد متاح',
      'es': 'No hay nuevas reservas disponibles.',
      'pt': 'Nenhuma nova reserva disponível'
    },
    'NO_PROVIDER_AVAILABLE': {
      'default': 'No provider available in your current location',
      'ar': 'لا يوجد مزود متاح في موقعك الحالي',
      'es': 'Ningún proveedor disponible en su ubicación actual',
      'pt': 'Nenhum provedor disponível em sua localização atual'
    },
    'FAIL_NOTIFICATION': {
      'default': 'Unable to send push notification at this time',
      'ar': 'غير قادر على إرسال إشعار الدفع في هذا الوقت',
      'es': 'No es posible enviar notificaciones push en este momento',
      'pt': 'Não é possível enviar uma notificação por push no momento'
    },
    'NO_BOOKING_REASSIGNED': {
      'default': 'There is not pending booking to reassign.',
      'ar': 'ليس هناك حجز معلق لإعادة التعيين.',
      'es': 'No hay reserva pendiente para reasignar.',
      'pt': 'Não há reserva pendente para reatribuir.'
    },
    'NO_BOOKING': {
      'default': 'Currently you dont have any active booking',
      'ar': 'حاليا ليس لديك أي حجز نشط',
      'es': 'Actualmente no tienes ninguna reserva activa',
      'pt': 'Atualmente você não tem nenhuma reserva ativa'
    },
    'INVALID_BOOKING': {
      'default': 'You dont have any completed trip. Please try after some time.',
      'ar': 'ليس لديك أي رحلة مكتملة. يرجى المحاولة بعد مرور بعض الوقت.',
      'es': 'No tienes ningún viaje completo. Por favor intente después de un tiempo.',
      'pt': 'Você não tem nenhuma viagem completa. Por favor, tente depois de algum tempo.'
    },
    'NO_DEVICE': {
      'default': 'No device available',
      'ar': 'لا يوجد جهاز متاح',
      'es': 'No hay dispositivo disponible',
      'pt': 'Nenhum dispositivo disponível'
    },
    'NO_EMAIL_TEMPLATE': {
      'default': 'No email template available',
      'ar': 'لا قالب البريد الإلكتروني المتاحة',
      'es': 'No hay plantilla de correo electrónico disponible',
      'pt': 'Nenhum modelo de email disponível'
    },
    'UNAUTHORIZED': {
      'default': 'Unauthorized access',
      'ar': 'دخول غير مرخص',
      'es': 'Acceso no autorizado',
      'pt': 'Acesso não autorizado'
    },
    'NO_DATA': {
      'default': 'No data found',
      'ar': 'لاتوجد بيانات',
      'es': 'Datos no encontrados',
      'pt': 'Nenhum dado encontrado'
    },
    'NO_EARNING': {
      'default': 'You dont have any earning. Please completed any trips.',
      'ar': 'ليس لديك أي ربح. يرجى إكمال أي رحلات.',
      'es': 'No tienes ninguna ganancia. Por favor completó cualquier viaje.',
      'pt': 'Você não tem nenhum ganho. Por favor, completou todas as viagens.'
    },
    'NO_VEHICLE_BRAND': {
      'default': 'There no vehicle brand is found.',
      'ar': 'لا يوجد ماركة مركبة.',
      'es': 'No se encuentra ninguna marca de vehículo.',
      'pt': 'Não existe uma marca de veículo.'
    },
    'NO_VEHICLE_MODEL': {
      'default': 'There no vehicle models found.',
      'ar': 'لا توجد نماذج مركبة.',
      'es': 'No se encontraron modelos de vehículos.',
      'pt': 'Não há modelos de veículos encontrados.'
    },
    'NO_VEHICLE': {
      'default': 'There no vehicle found.',
      'ar': 'لا يوجد مركبة.',
      'es': 'No se ha encontrado ningún vehículo.',
      'pt': 'Não há veículo encontrado.'
    },
    'ERROR_ADD_VEHICLE': {
      'default': 'Unable to add vehicle at this time',
      'ar': 'غير قادر على إضافة مركبة في هذا الوقت',
      'es': 'No se puede agregar vehículo en este momento',
      'pt': 'Não é possível adicionar o veículo neste momento'
    },
    'ERROR_CREATE_WALLET': {
      'default': 'Unable to create wallet at this time',
      'ar': 'غير قادر على إنشاء محفظة في هذا الوقت',
      'es': 'No se puede crear la billetera en este momento',
      'pt': 'Não é possível criar carteira neste momento'
    },
    'LOW_WALLET_BALANCE': {
      'default': 'You wallet balance is too low to create a withdrawal request.',
      'ar': 'رصيد المحفظة منخفض جدًا لإنشاء طلب سحب.',
      'es': 'El saldo de su billetera es demasiado bajo para crear una solicitud de retiro.',
      'pt': 'Seu saldo da carteira é muito baixo para criar uma solicitação de retirada.'
    },
    'ERROR_WALLET': {
      'default': 'Something went wrong getting you wallet Info. Please try again.',
      'ar': 'حدث خطأ ما في الحصول على معلومات المحفظة. حاول مرة اخرى.',
      'es': 'Algo salió mal al obtener la información de su billetera. Inténtalo de nuevo.',
      'pt': 'Algo deu errado ao conseguir sua carteira. Por favor, tente novamente.'
    },
    'STRIPE_PAYMENT_ERROR': {
      'default': 'Payment Failed.',
      'ar': 'عملية الدفع فشلت.',
      'es': 'Pago fallido.',
      'pt': 'Pagamento falhou.'
    },
    'PROMOCODE_EXPIRED': {
      'default': 'This promo code has expired',
      'ar': 'انتهت صلاحية الرمز الترويجي',
      'es': 'Este código promocional ha caducado',
      'pt': 'Este código promocional expirou'
    },
    'INVALID_PROMOCODE': {
      'default': 'This Coupon Code is Invalid',
      'ar': 'رمز القسيمة هذا غير صالح',
      'es': 'Este código de cupón no es válido',
      'pt': 'Este código de cupom é inválido'
    },
    'PROMOCODE_INVALIDAMOUNT': {
      'default': 'Amount has been exceeded on this promo code',
      'ar': 'تم تجاوز المبلغ على رمز العرض الترويجي هذا',
      'es': 'Se ha excedido la cantidad en este código promocional',
      'pt': 'O valor foi excedido neste código promocional'
    },
    'CREATE_TRANSACTION_ERROR': {
      'default': 'Unable to create transaction',
      'ar': 'غير قادر على إنشاء معاملة',
      'es': 'No se puede crear la transacción',
      'pt': 'Não é possível criar transação'
    },
    'EDIT_TRANSACTION_ERROR': {
      'default': 'Unable to edit transaction',
      'ar': 'غير قادر على تحرير المعاملة',
      'es': 'No se puede editar la transacción',
      'pt': 'Não é possível editar a transação'
    },
    'NO_TRANSACTION': {
      'default': 'No transaction found',
      'ar': 'لم يتم العثور على معاملة',
      'es': 'No se encontró ninguna transacción.',
      'pt': 'Nenhuma transação encontrada'
    },
    'NO_CARDID_FOUND': {
      'default': 'Please provide a valid card Id',
      'ar': 'يرجى تقديم بطاقة هوية صالحة',
      'es': 'Proporcione una identificación de tarjeta válida',
      'pt': 'Por favor, forneça um ID de cartão válido'
    },
    'NO_CARDS_FOUND': {
      'default': 'No card details found',
      'ar': 'لم يتم العثور على تفاصيل البطاقة',
      'es': 'No se encontraron detalles de la tarjeta',
      'pt': 'Nenhum detalhe do cartão encontrado'
    },
    'WITHDRAWAL_FAIL': {
      'default': 'Unable to create withdrawal request at this time',
      'ar': 'غير قادر على إنشاء طلب سحب في الوقت الحالي',
      'es': 'No se puede crear una solicitud de retiro en este momento',
      'pt': 'Não é possível criar solicitação de retirada no momento'
    }
  },
  SUCCESS: {
    'OTP': {
      'default': 'OTP has been verified Successfully',
      'ar': 'تم التحقق من OTP بنجاح',
      'es': 'OTP ha sido verificado con éxito',
      'pt': 'OTP foi verificado com sucesso'
    },
    'OTP_SENT': {
      'default': 'OTP has been sent Successfully',
      'ar': 'تم إرسال OTP بنجاح',
      'es': 'OTP ha sido enviado con éxito',
      'pt': 'OTP foi enviado com sucesso'
    },
    'EXIST: $[1]': {
      'default': 'Your $[1] exist',
      'ar': 'لديك $[1] موجود',
      'es': 'Sus $[1] existen',
      'pt': 'Seu $[1] existe'
    },
    'INSERTED': {
      'default': 'Your information has been registered successfully',
      'ar': 'تم تسجيل معلوماتك بنجاح',
      'es': 'Su información ha sido registrada exitosamente',
      'pt': 'Suas informações foram registradas com sucesso'
    },
    'VALID': {
      'default': 'Data loaded successfully',
      'ar': 'تم تحميل البيانات بنجاح',
      'es': 'Datos cargados exitosamente',
      'pt': 'Dados carregados com sucesso'
    },
    'PASSWORD': {
      'default': 'Your credentials has been verified successfully',
      'ar': 'تم التحقق من بيانات الاعتماد الخاصة بك بنجاح',
      'es': 'Sus credenciales han sido verificadas exitosamente',
      'pt': 'Suas credenciais foram verificadas com sucesso'
    },
    'PROVIDER_AVAILABLE': {
      'default': 'Provider available in your location',
      'ar': 'مزود المتاحة في موقعك',
      'es': 'Proveedor disponible en su ubicación',
      'pt': 'Provedor disponível em sua localização'
    },
    'PROVIDER_ARRIVED': {
      'default': 'Provider arrived at your location point',
      'ar': 'وصل مزود في نقطة موقعك',
      'es': 'El proveedor llegó a su punto de ubicación',
      'pt': 'Provedor chegou ao seu ponto de localização'
    },
    'PROVIDER_PICKUP': {
      'default': 'Provider picked up from your location point',
      'ar': 'اختار مزود من نقطة موقعك',
      'es': 'Proveedor recogido de su punto de ubicación',
      'pt': 'Fornecedor retirado do seu ponto de localização'
    },
    'PROVIDER_DROP': {
      'default': 'Provider dropped at your destination point',
      'ar': 'انخفض مزود في نقطة وجهتك',
      'es': 'Proveedor abandonado en su punto de destino',
      'pt': 'Provedor caiu no seu ponto de destino'
    },
    'PROFILE_UPDATE: $[1]': {
      'default': '$[1] has been updated successfully',
      'ar': '$[1] تحديث البيانات بنجاح',
      'es': '$[1] datos se han actualizado correctamente',
      'pt': '$[1] dados foram atualizados com sucesso'
    },
    'UPDATE': {
      'default': 'Data has been updated successfully',
      'ar': 'تم تحديث البيانات بنجاح',
      'es': 'Los datos se han actualizado correctamente',
      'pt': 'Os dados foram atualizados com sucesso'
    },
    'BOOKING_ADDED': {
      'default': 'Your booking has been confirmed. Please wait until we match our best Driver for you.',
      'ar': 'تم تأكيد الحجز الخاص بك. يرجى الانتظار حتى نطابق أفضل سائق لدينا.',
      'es': 'Su reserva ha sido confirmada. Espere hasta que coincidamos con nuestro mejor controlador para usted.',
      'pt': 'Sua reserva foi confirmada. Por favor, espere até combinarmos com o nosso melhor Driver para você.'
    },
    'NEW_BOOKING': {
      'default': 'New booking has been assigned.',
      'ar': 'تم تخصيص الحجز الجديد.',
      'es': 'Nueva reserva ha sido asignada.',
      'pt': 'Nova reserva foi atribuída.'
    },
    'STATUS_TOGGLE: $[1]': {
      'default': 'Your are now $[1]',
      'ar': 'أنت الآن $[1]',
      'es': 'Ahora eres $[1]',
      'pt': 'Você está agora $[1]'
    },
    'UNAUTHORIZED': {
      'default': 'Unauthorized access',
      'ar': 'دخول غير مرخص',
      'es': 'Acceso no autorizado',
      'pt': 'Acesso não autorizado'
    },
    'BOOKING_ACCEPT': {
      'default': 'Your have confirmed the booking. You can start the trip',
      'ar': 'لقد أكد الحجز. يمكنك أن تبدأ الرحلة',
      'es': 'Has confirmado la reserva. Puedes comenzar el viaje',
      'pt': 'Você confirmou a reserva. Você pode começar a viagem'
    },
    'BOOKING_REJECT': {
      'default': 'You have rejected the booking.',
      'ar': 'لقد رفضت الحجز.',
      'es': 'Has rechazado la reserva.',
      'pt': 'Você rejeitou a reserva.'
    },
    'BOOKING_CANCEL': {
      'default': 'Your booking has been cancelled.',
      'ar': 'تم إلغاء الحجز الخاص بك.',
      'es': 'Su reserva ha sido cancelada.',
      'pt': 'Sua reserva foi cancelada.'
    },
    'BOOKING_COMPLETE': {
      'default': 'Your booking has been completed',
      'ar': 'تم الانتهاء من الحجز',
      'es': 'Su reserva ha sido completada',
      'pt': 'Sua reserva foi concluída'
    },
    'ACTIVE_BOOKING': {
      'default': 'You have a active booking.',
      'ar': 'لديك حجز نشط.',
      'es': 'Tienes una reserva activa.',
      'pt': 'Você tem uma reserva ativa.'
    },
    'LOCATION_ID': {
      'default': 'Your Cell Id for the coordinates.',
      'ar': 'معرف الخلية الخاص بك للإحداثيات.',
      'es': 'Su ID de celda para las coordenadas.',
      'pt': 'Your Cell Id para as coordenadas.'
    },
    'FEEDBACK_SUCCESS': {
      'default': 'Thanks for the feedback.',
      'ar': 'شكرا على ملاحظاتك.',
      'es': 'Gracias por la respuesta.',
      'pt': 'Obrigado pelo feedback.'
    },
    'STRIPE_PAYMENT_SUCCESS': {
      'default': 'Payment Success.',
      'ar': 'الدفع الناجح.',
      'es': 'Pago exitoso.',
      'pt': 'Pagamento com sucesso.'
    },
    'SOCKET_TRACKING_ON': {
      'default': 'Your have joined the live tracking socket.',
      'ar': 'لقد انضممت إلى مأخذ التتبع المباشر.',
      'es': 'Te has unido a la toma de seguimiento en vivo.',
      'pt': 'Você se juntou ao soquete de rastreamento ao vivo.'
    },
    'VEHICLE_ADDED': {
      'default': 'Your vehicle has been added.',
      'ar': 'تمت إضافة سيارتك.',
      'es': 'Su vehículo ha sido agregado.',
      'pt': 'Seu veículo foi adicionado.'
    },
    'STRIPE_AC': {
      'default': 'Your Stripe Account has Created successfully',
      'ar': 'تم إنشاء حساب الشريط الخاص بك بنجاح',
      'es': 'Tu cuenta de Stripe se ha creado correctamente',
      'pt': 'Sua conta do Stripe foi criada com sucesso'
    },
    'VEHICLE_UPDATE': {
      'default': 'Your vehicle has been updated.',
      'ar': 'تم تحديث سيارتك.',
      'es': 'Su vehículo ha sido actualizado.',
      'pt': 'Seu veículo foi atualizado.'
    },
    'VEHICLE_ACTIVE': {
      'default': 'Your vehicle has been set to active',
      'ar': 'تم ضبط سيارتك على النشط',
      'es': 'Su vehículo ha sido configurado como activo',
      'pt': 'Seu veículo foi configurado para ativo'
    },
    'VEHICLE_DELETED': {
      'default': 'Your vehicle has been set to deleted',
      'ar': 'تم ضبط سيارتك على حذفها',
      'es': 'Su vehículo ha sido configurado para ser eliminado',
      'pt': 'Seu veículo foi definido como excluído'
    },
    'PROMOCODE_ACCEPT': {
      'default': 'This Promo codes is Applied',
      'ar': 'يتم تطبيق رموز الترويجي هذه',
      'es': 'Este código promocional se aplica',
      'pt': 'Este códigos promocionais são aplicados'
    },
    'WITHDRAWAL_SUCCESS': {
      'default': 'Withdrawal request has been created successfully',
      'ar': 'تم إنشاء طلب السحب بنجاح',
      'es': 'La solicitud de retiro se ha creado con éxito',
      'pt': 'O pedido de retirada foi criado com sucesso'
    }
  },
  SYSTEM: {
    'OOPS': {
      'default': 'OOPS something went wrong',
      'ar': 'تبا شيء ما حدث بشكل خاطئ',
      'es': 'Huy! Algo salió mal',
      'pt': 'OOPS algo deu errado'
    },
    'DB': {
      'default': 'Not able to connect with database',
      'ar': 'غير قادر على التواصل مع قاعدة البيانات',
      'es': 'No se puede conectar con la base de datos',
      'pt': 'Não é possível conectar-se ao banco de dados'
    }
  }
}
