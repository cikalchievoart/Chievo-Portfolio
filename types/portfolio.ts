export type ProjectModalType = "youtube" | "gdrive" | "customText";

export interface Project {
  id: string;
  title: string;
  images: string[];
  fullDescription: string;
  tags: string[];
  modalType?: ProjectModalType;
  embedUrl?: string;
  linkUrl?: string;
  customText?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  images: string[];
  description: string;
}

export interface Skill {
  name: string;
  desc: string;
  icon: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  details: string[];
  skills: string[];
}

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}

export interface OtpStoreRecord {
  code: string;
  data: ContactFormData;
  expiresAt: number;
  attempts: number;
}
