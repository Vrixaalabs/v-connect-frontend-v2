import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL, RESEND_VERIFICATION_EMAIL } from '@/graphql/mutations';
import TokenService from '@/lib/tokenService';
import { useAppDispatch } from '@/hooks/redux';
import { logoutUser } from '@/store/slices/authSlice';

type VerificationStatus = 'verifying' | 'success' | 'error' | 'idle';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [status, setStatus] = useState<VerificationStatus>(token ? 'verifying' : 'idle');
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const tokenService = TokenService.getInstance();

  const [verifyEmail] = useMutation(VERIFY_EMAIL, {
    onCompleted: () => {
      setStatus('success');
      toast.success('Success', 'Your email has been verified successfully!');
      
      // Clear tokens and logout
      tokenService.clearTokens();
      dispatch(logoutUser());
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
    onError: () => {
      setStatus('error');
      toast.error('Error', 'Failed to verify email. Please try again.');
    },
  });

  const [resendVerification, { loading: resending }] = useMutation(RESEND_VERIFICATION_EMAIL, {
    onCompleted: () => {
      toast.success('Success', 'Verification email has been resent. Please check your inbox.');
    },
    onError: () => {
      toast.error('Error', 'Failed to resend verification email.');
    },
  });

  useEffect(() => {
    if (token) {
      verifyEmail({ variables: { token } });
    }
  }, [token, verifyEmail]);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error('Error', 'Email address is missing.');
      return;
    }
    await resendVerification({ variables: { email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        {status === 'verifying' ? (
          <div className="text-center">
            <LoadingSpinner className="mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Verifying Your Email</h2>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </div>
        ) : status === 'success' ? (
          <div className="text-center">
            <div className="text-green-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-4">
              Your email has been verified successfully. Redirecting to login...
            </p>
            <Button
              variant="link"
              onClick={() => navigate('/login')}
              className="text-primary hover:underline"
            >
              Click here if not redirected
            </Button>
          </div>
        ) : status === 'error' ? (
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">
              We couldn't verify your email. The link might be expired or invalid.
            </p>
            <div className="space-y-4">
              <Button
                onClick={handleResendEmail}
                disabled={resending}
                className="w-full"
              >
                {resending ? 'Sending...' : 'Resend Verification Email'}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Email Verification Required</h2>
            <p className="text-gray-600 mb-6">
              Please verify your email address to continue. Check your inbox for the verification link.
            </p>
            <div className="space-y-4">
              <Button
                onClick={handleResendEmail}
                disabled={resending}
                className="w-full"
              >
                {resending ? 'Sending...' : 'Resend Verification Email'}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
