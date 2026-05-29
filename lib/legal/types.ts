export type LegalPolicyContact = {
  organization: string;
  emailLabel: string;
  email: string;
};

export type LegalPolicySection = {
  heading: string;
  paragraphs?: readonly string[];
  listItems?: readonly string[];
  afterListParagraphs?: readonly string[];
  contact?: LegalPolicyContact;
};

export type LegalPolicyContent = {
  englishLabel: string;
  japaneseTitle: string;
  intro: string;
  sections: readonly LegalPolicySection[];
  enactedDate: string;
};
