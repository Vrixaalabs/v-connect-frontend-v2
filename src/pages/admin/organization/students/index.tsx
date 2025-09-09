import { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import type { InstituteStudent } from '@/types/organization';
import InstituteAdminLayout from '@/components/admin/organization/OrganizationAdminLayout';
import { useNavigate } from 'react-router-dom';

const InstituteStudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<InstituteStudent | null>(null);
  const navigate = useNavigate();
  // TODO: Replace with actual API call
  const students: InstituteStudent[] = [];

  const handleRemoveStudent = async (student: InstituteStudent) => {
    navigate(`/admin/organization/students/${student.id}/remove`);
    // TODO: Implement student removal
  };

  return (
    <InstituteAdminLayout title='Students' description='Manage students in your institute'>
      <div className='flex justify-between items-center mb-6'>
        <Input
          type='text'
          placeholder='Search students...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='max-w-sm'
        />
      </div>

      <div className='rounded-md border'>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Department</th>
              <th>School</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.rollNumber}</td>
                <td>{student.department}</td>
                <td>{student.school}</td>
                <td>{new Date(student.joinedAt).toLocaleDateString()}</td>
                <td>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm' onClick={() => setSelectedStudent(student)}>
                      View
                    </Button>
                    <Button variant='destructive' size='sm' onClick={() => handleRemoveStudent(student)}>
                      Remove
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        {selectedStudent && (
          <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>Student Details</h2>
            <div className='space-y-4'>
              <div>
                <label className='font-semibold'>Name:</label>
                <p>{selectedStudent.name}</p>
              </div>
              <div>
                <label className='font-semibold'>Roll Number:</label>
                <p>{selectedStudent.rollNumber}</p>
              </div>
              <div>
                <label className='font-semibold'>Department:</label>
                <p>{selectedStudent.department}</p>
              </div>
              <div>
                <label className='font-semibold'>School:</label>
                <p>{selectedStudent.school}</p>
              </div>
              <div>
                <label className='font-semibold'>Joined Date:</label>
                <p>{new Date(selectedStudent.joinedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </InstituteAdminLayout>
  );
};

export default InstituteStudentsPage;
