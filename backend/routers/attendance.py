from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models
import schemas

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.AttendanceResponse, status_code=201)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(
        models.Employee.employee_id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    new_record = models.Attendance(
        employee_id=employee.id,
        date=attendance.date,
        status=attendance.status
    )

    try:
        db.add(new_record)
        db.commit()
        db.refresh(new_record)
    except:
        db.rollback()
        raise HTTPException(status_code=400, detail="Attendance already marked for this date")

    return new_record


@router.get("/{employee_id}", response_model=list[schemas.AttendanceResponse])
def get_attendance(employee_id: str, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(
        models.Employee.employee_id == employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee.id
    ).all()


from datetime import date

@router.get("/summary/today")
def get_today_summary(db: Session = Depends(get_db)):
    today = date.today()

    total_employees = db.query(models.Employee).count()

    present_count = db.query(models.Attendance).filter(
        models.Attendance.date == today,
        models.Attendance.status == models.StatusEnum.PRESENT
    ).count()

    absent_count = db.query(models.Attendance).filter(
        models.Attendance.date == today,
        models.Attendance.status == models.StatusEnum.ABSENT
    ).count()

    return {
        "total_employees": total_employees,
        "present_today": present_count,
        "absent_today": absent_count
    }
