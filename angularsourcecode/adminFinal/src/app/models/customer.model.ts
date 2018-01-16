export class Customer {
    private id: number;
    private custName: string;
    private password: string;

    constructor(private customer?: Customer) {
        if (this.customer != null) {
            this.id = customer.id;
            this.custName = customer.custName;
            this.password = customer.password;
        }
    }
    public get getId(): number {
        return this.id;
    }
    public set setId(id: number) {
        this.id = id;
    }
    public get getName(): string {
        return this.custName;
    }
    public set setName(name: string) {
        this.custName = name;
    }

    public get getPassword(): string {
        return this.password;
    }
    public set setPassword(password: string) {
        this.password = password;
    }
}