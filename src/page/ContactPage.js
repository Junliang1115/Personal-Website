import React from 'react';
import { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa';

function ContactPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    // Confirmation message state removed
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);   
        setNotification('');
        setShowNotification(false);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`.trim(),
                    email,
                    message,
                }),
            });
            if (res.ok) {
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
                setMessage('');
                setNotification('Your message has been sent successfully!');
            } else {
                setNotification('Failed to send your message. Please try again later.');
            }
        } catch (err) {
            setNotification('Failed to send your message. Please try again later.');
        }
        setShowNotification(true);
        setLoading(false);
    };

    // Auto-dismiss notification after 4 seconds
    React.useEffect(() => {
        if (showNotification && notification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
                setNotification('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [showNotification, notification]);

    return (
        <div
            style={{
                position: 'relative',
                width: '100vw',
                minHeight: '100vh',
                maxHeight: '100vh',
                overflow: 'hidden',
                fontFamily: 'Instrument Sans',
                background: 'linear-gradient(265.9deg, #1D1515 16.75%, #342020 57.09%, #1D1515 97.42%)',
            }}
        >
            {/* Title and Contact Info Block */}
            <div
                style={{
                    position: 'absolute',
                    left: '8vw',
                    top: '20vh',
                    width: '32vw',
                    minWidth: 200,
                    maxWidth: 400,
                    color: '#FFFFFF',
                    fontFamily: 'Instrument Sans',
                    fontWeight: 600,
                    fontSize: '3vw',
                    lineHeight: '1.2',
                    zIndex: 3,
                }}
            >
                Let's Connect
                <div style={{ marginTop: '2vh', display: 'flex', fontSize: '1.2vw'}}>
                    Whether you're down to build something cool, collaborate on a wild idea, or just want to say hi — I’m all ears.
                </div>
                <div style={{ marginTop: '7vh', display: 'flex', flexDirection: 'column', gap: '3vh' }}>
                    {/* Email */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
                        <FaEnvelope style={{ width: 30, height: 30 }} />
                        <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.5vw' }}>junliang1115@gmail.com</span>
                    </div>
                    {/* GitHub */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
                        <FaGithub style={{ width: 30, height: 30 }} />
                        <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.5vw' }}>Junliang1115</span>
                    </div>
                    {/* LinkedIn */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
                        <FaLinkedin style={{ width: 30, height: 30 }} />
                        <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.5vw' }}>Chew Jun Liang</span>
                    </div>
                    {/* Instagram */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
                        <FaInstagram style={{ width: 30, height: 30 }} />
                        <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.5vw' }}>junliang_chew</span>
                    </div>
                    {/* Discord */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
                        <FaDiscord style={{ width: 30, height: 30 }} />
                        <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.5vw' }}>junliang_chew</span>
                    </div>
                </div>
            </div>
            {/* Contact Card (Message Form) */}
            <div
                style={{
                    position: 'absolute',
                    left: '50vw',
                    top: '15vh',
                    width: '38vw',
                    minWidth: 320,
                    maxWidth: 600,
                    height: '70vh',
                    minHeight: 400,
                    maxHeight: 700,
                    background: 'rgba(0, 0, 0, 0.98)',
                    borderRadius: 15,
                    overflow: 'hidden',
                    padding: '3vw 2vw',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2vh',
                    boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)',
                }}
            >
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh', width: '100%' }}>
                    <div style={{ display: 'flex', gap: '1vw', width: '100%' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#fff', fontWeight: 600, fontSize: '1vw', marginBottom: 4 }}>First name</label>
                            <input type="text" placeholder="John" required
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                style={{ width: '100%', marginTop: 4, background: '#E5DFDF', border: 'none', borderRadius: 8, padding: '0.6vw 0.8vw', fontSize: '0.95vw', fontFamily: 'Instrument Sans', fontWeight: 500 , zIndex: 4}} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#fff', fontWeight: 600, fontSize: '1vw', marginBottom: 4 }}>Last name</label>
                            <input type="text" placeholder="Doe" required
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                style={{ width: '100%', marginTop: 4, background: '#E5DFDF', border: 'none', borderRadius: 8, padding: '0.6vw 0.8vw', fontSize: '0.95vw', fontFamily: 'Instrument Sans', fontWeight: 500 }} />
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <label style={{ color: '#fff', fontWeight: 600, fontSize: '1vw', marginBottom: 4 }}>Email</label>
                        <input
                            type="email"
                            placeholder="someone@gmail.com"
                            required
                            value={email || ''}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                            style={{ width: '100%', marginTop: 4, background: '#E5DFDF', border: 'none', borderRadius: 8, padding: '0.6vw 0.8vw', fontSize: '0.95vw', fontFamily: 'Instrument Sans', fontWeight: 500, zIndex: 4 }}
                        />
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <label style={{ color: '#fff', fontWeight: 600, fontSize: '1vw', marginBottom: 4 }}>Phone Number</label>
                        <input type="tel" placeholder="012 - 345 6789"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            style={{ width: '100%', marginTop: 4, background: '#E5DFDF', border: 'none', borderRadius: 8, padding: '0.6vw 0.8vw', fontSize: '0.95vw', fontFamily: 'Instrument Sans', fontWeight: 500, zIndex: 4 }} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <label style={{ color: '#fff', fontWeight: 600, fontSize: '1vw', marginBottom: 4 }}>Message</label>
                        <textarea type="text" placeholder="Write a thought..." required
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            style={{ width: '100%', marginTop: 4, background: '#E5DFDF', border: 'none', borderRadius: 8, padding: '0.6vw 0.8vw', fontSize: '0.95vw', fontFamily: 'Instrument Sans', fontWeight: 500, minHeight: 90, resize: 'vertical', zIndex: 10 , position: 'relative'}} />
                    </div>
                    <button type="submit" disabled={loading} style={{ background: '#BA3D01', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7vw', fontWeight: 600, fontSize: '1vw', marginTop: '1vh', cursor: loading ? 'not-allowed' : 'pointer', alignSelf: 'flex-end', width: '30%' }}>{loading ? 'Sending...' : 'Send Message'}</button>
                </form>
            </div>
        {/* Notification popup at bottom right */}
        {showNotification && notification && (
            <div style={{
                position: 'fixed',
                right: '2vw',
                bottom: '2vw',
                background: notification.includes('successfully') ? '#4BB543' : '#FF3333',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.1vw',
                borderRadius: '10px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                padding: '1.2vw 2vw',
                zIndex: 9999,
                minWidth: '220px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7vw',
                transition: 'opacity 0.3s',
            }}>
                {notification.includes('successfully') && (
                    <span style={{ fontSize: '1.3vw', marginRight: '0.3vw' }}>&#10003;</span>
                )}
                {notification}
            </div>
        )}
        </div>
    );
}

export default ContactPage;
