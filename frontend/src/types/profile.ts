
// --- Payloads ---
export type ProfilePayload = {
  userId: string;
  gender: 'male' | 'female';
  fullName: string;
  phone: string;
  address: string;
};

export type MeasurementsPayload = {
  [key: string]: number;
};

// --- Responses ---
export type ProfileResponse = {
  id: string;
  userId: string;
  gender: 'male' | 'female';
  fullName: string;
  phone: string;
  address: string;
  measurements: MeasurementsPayload;
  createdAt: string;
  updatedAt: string;
};