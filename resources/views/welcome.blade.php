<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Municipalidad de Mercedes</title>

    <link rel="icon" href="{{ asset('logomuni.png') }}" type="image/x-icon">

    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
</head>

<body>
    <div id="root"></div>
</body>

</html>
