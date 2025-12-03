export type SetCheckIn =
    {
        setCustomerName: (name: string) => void,
        setCustomerContact: (contact: string | number) => void,
        setDeviceName: (name: string) => void,
        setComplaint: (complaint: string) => void
    }