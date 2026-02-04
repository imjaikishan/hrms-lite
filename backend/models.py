from sqlalchemy import Column, String, Date, Enum, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base
import enum
import uuid

from sqlalchemy.dialects.sqlite import BLOB


class StatusEnum(str, enum.Enum):
    PRESENT = "PRESENT"
    ABSENT = "ABSENT"


class Employee(Base):
    __tablename__ = "employees"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id = Column(String, unique=True, nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    department = Column(String, nullable=False)

    attendance = relationship("Attendance", back_populates="employee", cascade="all, delete")


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id = Column(String, ForeignKey("employees.id"), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(Enum(StatusEnum), nullable=False)

    __table_args__ = (
        UniqueConstraint("employee_id", "date", name="unique_employee_date"),
    )

    employee = relationship("Employee", back_populates="attendance")
