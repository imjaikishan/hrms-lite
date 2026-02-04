from pydantic import BaseModel, EmailStr
from datetime import date
from models import StatusEnum


class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeResponse(BaseModel):
    id: str
    employee_id: str
    full_name: str
    email: str
    department: str

    class Config:
        orm_mode = True


class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: StatusEnum

class AttendanceResponse(BaseModel):
    id: str
    employee_id: str
    date: date
    status: str

    class Config:
        orm_mode = True
