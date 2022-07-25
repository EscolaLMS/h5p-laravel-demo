<!DOCTYPE html>

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@2.1.0/build/pure-min.css" integrity="sha384-yHIFVG6ClnONEA5yB5DJXfW2/KC173DIQrYoZMEtBvGzmf0PKiGyNEqe9N6BNDBH" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        #root {
            margin-left: auto;
            margin-right: auto;
            padding: 16px;
            max-width: 1200px;
        }

        #root>.pure-u {
            min-width: 1000px
        }
    </style>

    @viteReactRefresh
    @vite('resources/js/index.tsx')

</head>

<body>
    <div id="root"></div>
</body>