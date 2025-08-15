import { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa';

function ContactPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

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
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2vh', width: '100%' }}>
                    <div style={{ display: 'flex', gap: '1vw', width: '100%' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#fff', fontWeight: 600, fontSize: '1vw', marginBottom: 4 }}>First name</label>
                            <input type="text" placeholder="John" required style={{ width: '100%', marginTop: 4, background: '#E5DFDF', border: 'none', borderRadius: 8, padding: '0.6vw 0.8vw', fontSize: '0.95vw', fontFamily: 'Instrument Sans', fontWeight: 500 }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ color: '#fff', fontWeight: 600, fontSize: '1vw', marginBottom: 4 }}>Last name</label>
                            <input type="text" placeholder="Doe" required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={{ width: '100%', marginTop: 4, background: '#E5DFDF', border: 'none', borderRadius: 8, padding: '0.6vw 0.8vw', fontSize: '0.95vw', fontFamily: 'Instrument Sans', fontWeight: 500 }} />
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <label style={{ color: '#fff', fontWeight: 600, fontSize: '1vw', marginBottom: 4 }}>Email</label>
                        <input type="email" placeholder="someone@gmail.com" required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', marginTop: 4, background: '#E5DFDF', border: 'none', borderRadius: 8, padding: '0.6vw 0.8vw', fontSize: '0.95vw', fontFamily: 'Instrument Sans', fontWeight: 500 }} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <label style={{ color: '#fff', fontWeight: 600, fontSize: '1vw', marginBottom: 4 }}>Phone Number</label>
                        <input type="tel" placeholder="012 - 345 6789"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{ width: '100%', marginTop: 4, background: '#E5DFDF', border: 'none', borderRadius: 8, padding: '0.6vw 0.8vw', fontSize: '0.95vw', fontFamily: 'Instrument Sans', fontWeight: 500, zIndex: 4 }} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <label style={{ color: '#fff', fontWeight: 600, fontSize: '1vw', marginBottom: 4 }}>Message</label>
                        <textarea type="text" placeholder="Write a thought..." required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ width: '100%', marginTop: 4, background: '#E5DFDF', border: 'none', borderRadius: 8, padding: '0.6vw 0.8vw', fontSize: '0.95vw', fontFamily: 'Instrument Sans', fontWeight: 500, minHeight: 90, resize: 'vertical', zIndex: 10 , position: 'relative'}} />
                    </div>
                    <button type="submit" style={{ background: '#BA3D01', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7vw', fontWeight: 600, fontSize: '1vw', marginTop: '1vh', cursor: 'pointer', alignSelf: 'flex-end', width: '30%' }}>Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;
