import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type ParamTypes = {
    params: {
        id: string
    }
};

export async function GET(request: NextRequest, { params }: ParamTypes) {
    try {
        const filePath = path.join(process.cwd(), "database", "employee.json");

        const employees = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const employee = employees.find((employee: any) => employee.id === parseInt(params.id));

        if (!employee) {
            return NextResponse.json("khong tim thay nhan vien");
        }

        return NextResponse.json(employee);

    } catch (error) {
        return NextResponse.json("Loi");
    }
}






export async function PUT(request: NextRequest, { params }: ParamTypes) {
    try {
        const filePath = path.join(process.cwd(), "database", "employee.json");

        const employees = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const employeeIndex = employees.findIndex((employee: any) => employee.id === parseInt(params.id));

        if (employeeIndex === -1) {
            return NextResponse.json("Khong tim thay");
        }

        const { name, dateOfBirth, image, email } = await request.json();

        employees[employeeIndex] = {
            ...employees[employeeIndex],
            employeeName: name || employees[employeeIndex].employeeName,
            dateOfBirth: dateOfBirth || employees[employeeIndex].dateOfBirth,
            image: image || employees[employeeIndex].image,
            email: email || employees[employeeIndex].email,
        };

        fs.writeFileSync(filePath, JSON.stringify(employees, null, 2), "utf8");

        return NextResponse.json("Cap nhat thanh cong");

    } catch (error) {
        return NextResponse.json("Cap nhat that bai!");
    }
}


export async function DELETE(request: NextRequest, { params }: ParamTypes) {
    try {
        const filePath = path.join(process.cwd(), "database", "employee.json");

        const employees = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const employeeIndex = employees.findIndex((employee: any) => employee.id === parseInt(params.id));

        if (employeeIndex === -1) {
            return NextResponse.json("Khong tim thay ");
        }

        employees.splice(employeeIndex, 1);

        fs.writeFileSync(filePath, JSON.stringify(employees, null, 2), "utf8");

        return NextResponse.json("Xoa thanh cong");

    } catch (error) {
        console.error("Error during deletion:", error);
        return NextResponse.json("Xoa that bai");
    }
}


