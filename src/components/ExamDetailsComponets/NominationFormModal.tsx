import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { showToast } from "../../utils/toastMessageUtils";
import { NominationData } from "../../types/NominationForm.types";
import { submitNomination } from "../../api/NominationFormApi";

interface NominationFormModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
  certificationName: string;
  examSelectableMonthFrom: string;
  examSelectableMonthTo: string;
}

const NominationFormModal: React.FC<NominationFormModalProps> = ({
  open,
  onClose,
  id,
  certificationName,
  examSelectableMonthFrom,
  examSelectableMonthTo,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    plannedExamMonth: "",
    motivation: "",
  };

  const validationSchema = Yup.object({
    plannedExamMonth: Yup.string().required("Planned Exam Month is required"),
    motivation: Yup.string().required("Motivation is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setIsSubmitting(true); // Set submitting state to true
      const getEmployeeId = () => 10; // Replace with actual logic to get employee ID

      const newNomination: NominationData = {
        certificationId: id,
        plannedExamMonth: values.plannedExamMonth,
        motivationDescription: values.motivation,
        employeeId: getEmployeeId(),
        createdBy: getEmployeeId().toString(),
        updatedBy: getEmployeeId().toString(),
      };

      // Submit the nomination
      await submitNomination(newNomination);
      showToast("Nomination submitted successfully!", "success");
      onClose();
    } catch (error: unknown) {
      // Handle error and show toast message
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit nomination.";
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // Set the min and max values for the calendar based on the passed parameters
  const minDate = new Date(examSelectableMonthFrom).toISOString().slice(0, 7); // e.g., "2025-02"
  const maxDate = new Date(examSelectableMonthTo).toISOString().slice(0, 7); // e.g., "2025-04"

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: "10px", padding: "10px", minWidth: "300px" } }}>
      <DialogTitle>
        Nominate for{" "}
        <Typography component="span" sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "1.2rem" }}>
          {certificationName}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          Please fill in the following details to nominate yourself for this certification.
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <Field
                as={TextField}
                name="plannedExamMonth"
                label="Planned Exam Month"
                type="month"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: {
                    min: minDate, // Set min month from `examSelectableMonthFrom`
                    max: maxDate, // Set max month from `examSelectableMonthTo`
                  },
                }}
                value={values.plannedExamMonth}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
              />
              <ErrorMessage name="plannedExamMonth">
                {(msg) => <Typography color="error">{msg}</Typography>}
              </ErrorMessage>

              <Field
                as={TextField}
                name="motivation"
                label="Justification for Certification Choice"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                placeholder="This will be reviewed by the Department head and L&D."
                value={values.motivation}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
              />
              <ErrorMessage name="motivation">
                {(msg) => <Typography color="error">{msg}</Typography>}
              </ErrorMessage>

              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default NominationFormModal;
