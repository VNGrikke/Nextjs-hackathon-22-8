"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import Form from "@/components/form"

interface Employee {
  id: number;
  employeeName: string;
  dateOfBirth: string;
  image: string;
  email: string;
}

export default function Page() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("Loi tai du lieu nhan vien");
      });
  }, []);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleDelete = async (employee: Employee) => {
    const isConfirmed = window.confirm(`Ban co muon xoa ${employee.employeeName} ?`);
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/employees/${employee.id}`);
        setEmployees(employees.filter(emp => emp.id !== employee.id));
      } catch (error) {
        console.error("Loi khi xoa nhan vien");
      }
    }
  };

  return (
    <div className='flex'>
      <div className='w-10/12'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">STT</TableHead>
              <TableHead className='w-1/5'>Tên nhân viên</TableHead>
              <TableHead className='w-1/5'>Ngày sinh</TableHead>
              <TableHead className='w-1/5'>Hình ảnh</TableHead>
              <TableHead className='w-1/5'>Email</TableHead>
              <TableHead className="text-center">Chức năng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{employee.employeeName}</TableCell>
                <TableCell>{employee.dateOfBirth}</TableCell>
                <TableCell><img className='w-[50px]' src={employee.image} alt={employee.employeeName} /></TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell className="text-center">
                  <Button variant="destructive" size="sm" onClick={() => handleEdit(employee)}>Sửa</Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(employee)}>Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='w-2/12'>
        <Form employee={selectedEmployee} />
      </div>
    </div>
  )
}
