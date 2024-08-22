import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "database", "employee.json");

        const data = fs.readFileSync(filePath, "utf8");

        const employees = JSON.parse(data);

        return NextResponse.json(employees);
    } catch (error) {
        return NextResponse.json( "Loi" );
    }
}

export async function POST(request: NextRequest) {
    try {
        const filePath = path.join(process.cwd(), "database", "employee.json");

        const employees = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const { employeeName, dateOfBirth, image, email } = await request.json();

        const existingEmployee = employees.find((employee: any) => employee.email === email);

        if (existingEmployee) {
            return NextResponse.json("Email da ton tai" );
        }

        const newEmployee = {
            id: employees.length + 1,
            employeeName,
            dateOfBirth,
            image,
            email,
        };

        employees.push(newEmployee);

        fs.writeFileSync(filePath, JSON.stringify(employees), "utf8");

        return NextResponse.json("Them thanh cong");

    } catch (error) {
        return NextResponse.json("Them that bai");
    }
}
