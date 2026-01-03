import "reflect-metadata";

type Constructor = new (...args: any[]) => {};

// Log is a class decorator factory (returns a decorator function).
function Log(message: string) {
  return function (constructor: Function) {
    console.log(`${message}: ${constructor.name}`);
  };
}

@Log("The decorators are awesome") //Log function is called with TestUser constructor.
class TestUser {
  constructor(public name: string) {}
}
//Key point: this happens when the class is defined, not when you create an instance.

const ControllerKey = Symbol("Controller");

// class decorator factory.
function Controller(basePath: string = "/") {
  return function (constructor: Function) {
    Reflect.defineMetadata(ControllerKey, basePath, constructor);
  };
}

//Applying Controller
@Controller("/users")
class UserController {
  constructor(public name: string) {}
}

@Controller("/posts")
class PostController {
  constructor(public name: string) {}
}

const data = [UserController, PostController].map((c) =>
  Reflect.getMetadata(ControllerKey, c)
);
console.log(data);

// ✅ Mental model
// Class is defined → decorators run
// Decorators attach metadata or modify behavior
// Framework reads metadata → configures DI, routing, validation, etc.
// Objects are created later → metadata guides behavior
