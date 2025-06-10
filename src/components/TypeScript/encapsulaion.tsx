class User {
        private _name: string;

        constructor(name: string){
                this._name = name;
        }
        get name(): string{
                return this._name;
        }
        set name(newName: string){
                if(newName.length > 2){
                        this._name = newName;
                }
        }
}

class Person {
        public name: string;
        private age: number;
        protected address: string

        constructor(name: string, age:number, address: string){
                this.name = name;
                this.age = age;
                this.address = address
        }

        public getAge(){
                return this.age //access private inside class
        }
}

class Student extends Person {
        public getAddress(){
                return this.address // access protected into subclass
        }

}

const p = new Person ('shahab', 30, "chittagon")
console.log(p.name) //can show
console.log(p.age) //error as it is private
console.log(p.address) //error as it is protected


