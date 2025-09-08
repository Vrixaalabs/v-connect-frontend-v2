import EntityTopbar from '../../components/entity/EntityTopbar';
import { Outlet } from 'react-router-dom';

interface EntityLayoutProps {
  children?: React.ReactNode;
}

export const EntityLayout: React.FC<EntityLayoutProps> = ({ children }) => {
  console.log('[EntityLayout] mounted');
  return (
    <div>
      <EntityTopbar />
      {/* <Outlet /> */}
      {children}
    </div>
  );
};

export default EntityLayout;
