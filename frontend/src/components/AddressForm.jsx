import { useState } from 'react';

const empty = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
};

export default function AddressForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial ?? empty);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, pincode: Number(form.pincode) });
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <input
        placeholder="Address Line 1"
        value={form.addressLine1}
        onChange={(e) => set('addressLine1', e.target.value)}
        required
      />
      <input
        placeholder="Address Line 2"
        value={form.addressLine2}
        onChange={(e) => set('addressLine2', e.target.value)}
      />
      <input
        placeholder="City"
        value={form.city}
        onChange={(e) => set('city', e.target.value)}
        required
      />
      <input
        placeholder="State"
        value={form.state}
        onChange={(e) => set('state', e.target.value)}
        required
      />
      <input
        placeholder="Pincode"
        type="number"
        value={form.pincode}
        onChange={(e) => set('pincode', e.target.value)}
        required
      />
      <input
        placeholder="Country"
        value={form.country}
        onChange={(e) => set('country', e.target.value)}
        required
      />

      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? 'Saving…' : 'Save Address'}
        </button>
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
