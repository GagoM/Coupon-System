export class Company {
    private id: number;
    private compName: string;
    private email: string;
    private password: string;

    constructor(private company?: Company) {
        if (this.company != null) {
            this.id = company.id;
            this.compName = company.compName;
            this.email = company.email;
            this.password = company.password;
        }
    }
    public get getId(): number {
        return this.id;
    }
    public set setId(id: number) {
        this.id = id;
    }
    public get getName(): string {
        return this.compName;
    }
    public set setName(name: string) {
        this.compName = name;
    }
    public get getEmail(): string {
        return this.email;
    }
    public set setEmail(email: string) {
        this.email = email;
    }
    public get getPassword(): string {
        return this.password;
    }
    public set setPassword(password: string) {
        this.password = password;
    }

}