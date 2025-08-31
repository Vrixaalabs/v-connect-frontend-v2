import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Shield, Lock } from 'lucide-react';

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    code: '',
  });
  const [step, setStep] = useState<'credentials' | 'twoFactor'>('credentials');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'credentials') {
      // TODO: Validate credentials and send 2FA code
      setStep('twoFactor');
    } else {
      // TODO: Verify 2FA code and complete login
      navigate('/super-admin/dashboard');
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

                <Button type="submit" className="w-full">
                  Continue
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
                </div>

                <div className="space-y-2">
                  <Label>Verification Code</Label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    required
                    className="text-center text-2xl tracking-wider"
                    maxLength={6}
                  />
                </div>

                <div className="space-y-4">
                  <Button type="submit" className="w-full">
                    Verify & Login
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStep('credentials')}
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
