'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ArrowLeft, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { storage } from '@/lib/storage';

const OTPForm = ({ phoneNumber, onSuccess, onEditPhone }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Don't auto-submit, let user click the button
    // if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
    //   handleSubmit(newOtp.join(''));
    // }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = e => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }

    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (otpValue = otp.join('')) => {
    console.log('=== OTP VERIFICATION DEBUG ===');
    console.log('OTP Array:', otp);
    console.log('OTP Value:', otpValue);
    console.log('OTP Length:', otpValue.length);
    console.log('OTP Type:', typeof otpValue);

    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock OTP verification - accept any 6-digit number for testing
      console.log('Checking OTP:', otpValue);
      console.log('Is 6 digits?', /^\d{6}$/.test(otpValue));

      if (/^\d{6}$/.test(otpValue)) {
        console.log('✅ OTP verification successful!');
        // Move temp user data to permanent storage
        const tempUser = storage.getItem('tempUser');
        if (tempUser) {
          const userData = JSON.parse(tempUser);
          storage.setItem('user', JSON.stringify(userData));
          storage.setItem('token', userData.token);
          storage.removeItem('tempUser');
          storage.removeItem('tempPhone');
        }
        onSuccess?.();
      } else {
        console.log('❌ OTP verification failed - not 6 digits');
        setError('Invalid OTP. Please enter a 6-digit number.');
      }
    } catch (error) {
      console.error('❌ OTP verification error:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate resending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimeLeft(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Enter OTP</CardTitle>
        <CardDescription className="text-center">
          An OTP was sent to {phoneNumber}
          <button
            onClick={onEditPhone}
            className="ml-2 text-blue-600 hover:underline"
          >
            Edit
          </button>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log('Form submitted, OTP array:', otp);
            handleSubmit();
          }}
          className="space-y-6"
        >
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={e => handleInputChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            {canResend ? (
              <Button
                type="button"
                variant="ghost"
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Resend OTP
              </Button>
            ) : (
              <p className="text-sm text-gray-600">
                Resend OTP in {formatTime(timeLeft)} seconds
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || otp.some(digit => digit === '')}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verifying...
              </>
            ) : (
              'Verify'
            )}
          </Button>

          {/* Back to Registration */}
          <div className="text-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Registration
            </Link>
          </div>
        </form>

        {/* Demo OTP */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800 text-center mb-2">
            <strong>Demo:</strong> Enter any 6-digit number for testing
          </p>
          <div className="flex justify-center space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setOtp(['1', '2', '3', '4', '5', '6']);
                inputRefs.current[5]?.focus();
              }}
              className="text-xs"
            >
              Fill 123456
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
              }}
              className="text-xs"
            >
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPForm;
