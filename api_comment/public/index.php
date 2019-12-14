<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../vendor/autoload.php';

$routes = require (__DIR__ . '/../src/config/routing.php');

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['PATH_INFO'] ?? '';
$dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) use ($routes) {
    foreach ($routes as $route) {
        $r->addRoute($route['method'], $route['path'], $route['action']);
    }
});


if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}

$uri = rawurldecode($uri);
$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        echo 'Route non trouvée !!';
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        echo 'Méthode non autorisée';
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = new $routeInfo[1];
        $vars = $routeInfo[2];
        echo $handler($vars);
        break;
}
