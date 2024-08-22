"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'

interface Employee {
  id?: number;
  employeeName: string;
  dateOfBirth: string;
  image: string;
  email: string;
}

interface FormProps {
  employee?: Employee | null;
}

export default function Form({ employee }: FormProps) {
  const [formEmployee, setFormEmployee] = useState<Employee>({
    employeeName: '',
    dateOfBirth: '',
    image: '',
    email: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (employee) {
      setFormEmployee({
        employeeName: employee.employeeName,
        dateOfBirth: employee.dateOfBirth,
        image: employee.image,
        email: employee.email,
      });
      setIsEditing(true);
    } else {
      setFormEmployee({
        employeeName: '',
        dateOfBirth: '',
        image: '',
        email: '',
      });
      setIsEditing(false);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormEmployee({ ...formEmployee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      if (isEditing && employee?.id) {
        await axios.put(`http://localhost:3000/api/employees/${employee.id}`, formEmployee);
      } else {
        await axios.post('http://localhost:3000/api/employees', formEmployee);
      }

      setFormEmployee({ employeeName: '', dateOfBirth: '', image: '', email: '' });
      setError(null); 
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); 
      } else {
        setError("Có lỗi xảy ra!");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{isEditing ? "Cập nhật nhân viên" : "Thêm mới nhân viên"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-2">Tên nhân viên</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={formEmployee.employeeName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formEmployee.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formEmployee.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formEmployee.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <Button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isEditing ? "Cập nhật" : "Thêm"}
        </Button>
      </form>
    </div>
  );
}
