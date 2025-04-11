import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="md">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} My Gallery. All rights reserved.
          </Typography>
          {/* Optional links */}
          <Stack direction="row" spacing={2}>
            <Link href="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body2">Privacy</Typography>
            </Link>
            <Link href="/terms" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body2">Terms</Typography>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
