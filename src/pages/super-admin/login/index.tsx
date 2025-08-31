import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Shield, Lock } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { SUPER_ADMIN_LOGIN, VERIFY_SUPER_ADMIN_2FA } from '@/graphql/mutations';
import TokenService from '@/lib/tokenService';

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const tokenService = TokenService.getInstance();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    code: '',
  });
  const [step, setStep] = useState<'credentials' | 'twoFactor'>('credentials');
  const [loading, setLoading] = useState(false);

  const [superAdminLogin] = useMutation(SUPER_ADMIN_LOGIN, {
    onCompleted: (data) => {
      if (data.superAdminLogin.success) {
        if (data.superAdminLogin.requiresTwoFactor) {
          setStep('twoFactor');
          toast.info('Verification Required', 'Please enter the verification code sent to your email.');
        } else {
          tokenService.setTokens(data.superAdminLogin.token);
          console.log(data.superAdminLogin.token);
          console.log("navigating to super admin dashboard");
          navigate('/super-admin/dashboard', { replace: true });
        }
      } else {
        toast.error('Login Failed', data.superAdminLogin.message);
      }
      setLoading(false);
    },
    onError: (error) => {
      toast.error('Login Failed', error.message);
      setLoading(false);
    },
  });

  const [verifySuperAdmin2FA] = useMutation(VERIFY_SUPER_ADMIN_2FA, {
    onCompleted: (data) => {
      if (data.verifySuperAdmin2FA.success) {
        tokenService.setTokens(data.verifySuperAdmin2FA.token);
        navigate('/super-admin/dashboard', { replace: true });
        toast.success('Login Successful', 'Welcome back, Super Admin!');
      } else {
        toast.error('Verification Failed', data.verifySuperAdmin2FA.message);
      }
      setLoading(false);
    },
    onError: (error) => {
      toast.error('Verification Failed', error.message);
      setLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (step === 'credentials') {
      await superAdminLogin({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
    } else {
      await verifySuperAdmin2FA({
        variables: {
          email: formData.email,
          code: formData.code,
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-6"
      >
        <Card className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-center">Super Admin Access</h1>
            <p className="text-muted-foreground text-center mt-2">
              Secure login for system administrators
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 'credentials' ? (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Continue'}
                </Button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <p className="text-muted-foreground">
                    Enter the verification code sent to your email
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    A 6-digit code has been sent to {formData.email}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Verification Code</Label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={formData.code}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 6) {
                        setFormData({ ...formData, code: value });
                      }
                    }}
                    required
                    className="text-center text-2xl tracking-wider"
                    maxLength={6}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                </div>

                <div className="space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading || formData.code.length !== 6}
                  >
                    {loading ? 'Verifying...' : 'Verify & Login'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setStep('credentials');
                      setFormData({ ...formData, code: '' });
                    }}
                    disabled={loading}
                  >
                    Back to Login
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default SuperAdminLogin;
