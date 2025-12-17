exports.validateAppointment = (data) => {
  const { customerId, serviceName, appointmentDate } = data;

  if (!customerId) return "customerId is required";
  if (!serviceName) return "serviceName is required";

  const date = new Date(appointmentDate);
  if (isNaN(date.getTime())) return "appointmentDate must be a valid date";

  return null;
};
