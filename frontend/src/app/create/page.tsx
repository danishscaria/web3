'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { FACTORY_ADDRESS } from '@/lib/addresses';
import factoryABI from '@/abi/CampaignFactory.json';

export default function CreateCampaign() {
  const router = useRouter();
  const { isConnected } = useAccount();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const { write: createCampaign, data: createData } = useContractWrite({
    address: FACTORY_ADDRESS as `0x${string}`,
    abi: factoryABI,
    functionName: 'createCampaign',
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: createData?.hash,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {
      title: '',
      description: '',
      target: '',
      deadline: '',
      image: '',
    };
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.target || parseFloat(formData.target) <= 0) {
      errors.target = 'Target amount must be greater than 0';
      isValid = false;
    }

    if (!formData.deadline) {
      errors.deadline = 'Deadline is required';
      isValid = false;
    } else {
      const deadlineDate = new Date(formData.deadline);
      if (deadlineDate <= new Date()) {
        errors.deadline = 'Deadline must be in the future';
        isValid = false;
      }
    }

    if (!formData.image.trim()) {
      errors.image = 'Image URL is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    const deadlineTimestamp = Math.floor(new Date(formData.deadline).getTime() / 1000);
    const targetAmount = BigInt(parseFloat(formData.target) * 10**18);

    createCampaign({
      args: [
        formData.title,
        formData.description,
        targetAmount,
        BigInt(deadlineTimestamp),
        formData.image,
      ],
    });
  };

  // Redirect to home after successful creation
  if (isSuccess) {
    router.push('/');
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create a New Campaign</h1>
      
      {!isConnected && (
        <div className="mb-6 p-4 bg-yellow-100 text-yellow-700 rounded-md">
          Please connect your wallet to create a campaign.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Campaign Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter campaign title"
            disabled={isLoading}
          />
          {formErrors.title && (
            <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your campaign"
            rows={4}
            disabled={isLoading}
          />
          {formErrors.description && (
            <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="target">
            Target Amount (SHM)
          </label>
          <input
            type="number"
            id="target"
            name="target"
            value={formData.target}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.target ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter target amount in SHM"
            step="0.01"
            min="0"
            disabled={isLoading}
          />
          {formErrors.target && (
            <p className="text-red-500 text-sm mt-1">{formErrors.target}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="deadline">
            Campaign Deadline
          </label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.deadline ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isLoading}
          />
          {formErrors.deadline && (
            <p className="text-red-500 text-sm mt-1">{formErrors.deadline}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Campaign Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              formErrors.image ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter image URL"
            disabled={isLoading}
          />
          {formErrors.image && (
            <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Provide a URL to an image that represents your campaign
          </p>
        </div>
        
        <button
          type="submit"
          className={`w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isLoading || !isConnected}
        >
          {isLoading ? 'Creating Campaign...' : 'Create Campaign'}
        </button>
      </form>
    </div>
  );
}