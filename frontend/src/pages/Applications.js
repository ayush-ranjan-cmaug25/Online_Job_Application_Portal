import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams } from 'react-router-dom';

export default function Applications(){
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(()=>{
    const load = async ()=>{
      try { const res = await API.get(`/applications/job/${jobId}`); setApps(res.data); } catch (err) { /* ignore */ }
    };
    load();
  }, [jobId]);

  const apply = async (e)=>{
    e.preventDefault();
    try {
      await API.post('/applications', { jobId: Number(jobId), message });
      alert('Applied successfully');
      setMessage('');
    } catch (err) {
      alert(err.response?.data?.error || 'Apply failed');
    }
  };

  return (
    <div className="container container-smash mt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="glass p-3">
            <h5>Apply for this job</h5>
            <form onSubmit={apply}>
              <textarea className="form-control mb-3" rows="4" placeholder="Message / cover letter" value={message} onChange={e=>setMessage(e.target.value)} required />
              <button className="btn btn-glass">Submit Application</button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <h5>Received applications</h5>
          {apps.length===0 && <p className="text-muted">No applications or not authorized to view.</p>}
          <ul className="list-group">
            {apps.map(a=>(
              <li key={a.id} className="list-group-item">
                <b>{a.applicant?.name || 'Applicant'}</b> — {a.applicant?.email}
                <p>{a.message}</p>
                <small className="text-muted">{new Date(a.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
