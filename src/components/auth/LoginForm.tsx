
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const loginAsDemoUser = async (role: string) => {
    let demoEmail = '';
    
    switch(role) {
      case 'admin':
        demoEmail = 'admin@aerospace.com';
        break;
      case 'approveAuthority':
        demoEmail = 'approver@aerospace.com';
        break;
      case 'storeUser':
        demoEmail = 'store@aerospace.com';
        break;
      case 'projectUser':
        demoEmail = 'project@aerospace.com';
        break;
      default:
        return;
    }
    
    await login(demoEmail, 'password');
  };

  return (
    <Card className="w-[400px] shadow-lg animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@aerospace.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button type="button" variant="link" className="text-xs p-0 h-auto">
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Sign in
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Demo accounts for testing:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => loginAsDemoUser('admin')}
                className="text-xs h-7"
              >
                Admin
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => loginAsDemoUser('approveAuthority')}
                className="text-xs h-7"
              >
                Approver
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => loginAsDemoUser('storeUser')}
                className="text-xs h-7"
              >
                Store
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => loginAsDemoUser('projectUser')}
                className="text-xs h-7"
              >
                Project
              </Button>
            </div>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
