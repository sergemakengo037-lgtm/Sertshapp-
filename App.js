import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Alert
} from 'react-native';

const BLUE = '#0B65D8';
const PALE = '#EAF3FF';

const initialPosts = [
  { id: 1, name: 'Bienvenue sur SERTSHAPP', handle: '@sertshapp', time: 'À l’instant', body: 'Bienvenue dans votre nouvel espace de communication et de partage. Publiez vos photos, vidéos et documents !', likes: 24, comments: 6, type: 'Annonce' },
  { id: 2, name: 'Communauté SERTSHAPP', handle: '@communaute', time: 'Il y a 1 h', body: 'Ici, vos idées et vos moments peuvent voyager partout. Restez connectés !', likes: 12, comments: 3, type: 'Publication' }
];

export default function App() {
  const [tab, setTab] = useState('Accueil');
  const [posts, setPosts] = useState(initialPosts);
  const [draft, setDraft] = useState('');
  const [method, setMethod] = useState('Téléphone');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  const publish = () => {
    if (!draft.trim()) return Alert.alert('Publication vide', 'Écris un message avant de publier.');
    setPosts([{ id: Date.now(), name: 'Mon profil', handle: '@membre', time: 'À l’instant', body: draft.trim(), likes: 0, comments: 0, type: 'Publication' }, ...posts]);
    setDraft(''); setTab('Accueil');
    Alert.alert('Publication ajoutée', 'Ta publication apparaît dans le fil de démonstration.');
  };

  const signIn = () => {
    if (!contact.trim() || !password.trim()) return Alert.alert('Informations manquantes', 'Saisis ton numéro ou e-mail et ton mot de passe.');
    setSignedIn(true);
  };

  if (!signedIn) return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />
      <View style={styles.hero}>
        <View style={styles.logo}><Text style={styles.logoLetter}>S</Text></View>
        <Text style={styles.brand}>SERTSHAPP</Text>
        <Text style={styles.tagline}>Connecter • Communiquer • Partager</Text>
      </View>
      <View style={styles.authCard}>
        <Text style={styles.heading}>Bienvenue !</Text>
        <Text style={styles.muted}>Connecte-toi pour rejoindre la communauté.</Text>
        <View style={styles.switchRow}>
          {['Téléphone', 'E-mail'].map(x => <TouchableOpacity key={x} onPress={() => setMethod(x)} style={[styles.switch, method === x && styles.switchActive]}><Text style={[styles.switchText, method === x && styles.switchTextActive]}>{x}</Text></TouchableOpacity>)}
        </View>
        <TextInput style={styles.input} placeholder={method === 'Téléphone' ? 'Numéro de téléphone' : 'Adresse e-mail'} value={contact} onChangeText={setContact} keyboardType={method === 'Téléphone' ? 'phone-pad' : 'email-address'} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.primary} onPress={signIn}><Text style={styles.primaryText}>Se connecter</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Création de compte', 'La création réelle de compte sera activée avec le service sécurisé d’authentification.') }><Text style={styles.link}>Nouveau ici ? Créer un compte</Text></TouchableOpacity>
        <Text style={styles.smallNote}>Prototype de démonstration — aucun compte n’est encore créé en ligne.</Text>
      </View>
    </SafeAreaView>
  );

  const nav = [ ['Accueil', '⌂'], ['Messages', '✉'], ['Publier', '+'], ['Alertes', '♡'], ['Profil', '○'] ];
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.topbar}><View style={styles.miniLogo}><Text style={styles.miniLogoText}>S</Text></View><Text style={styles.topBrand}>SERTSHAPP</Text><TouchableOpacity onPress={() => Alert.alert('Notifications', 'Tu retrouveras ici tes nouvelles notifications.')}><Text style={styles.bell}>♧</Text></TouchableOpacity></View>
      {tab === 'Accueil' && <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Fil d’actualité</Text>
        <Text style={styles.muted}>Découvre ce que la communauté partage.</Text>
        <TouchableOpacity style={styles.quickPost} onPress={() => setTab('Publier')}><Text style={styles.quickText}>Quoi de neuf ? Partage quelque chose…</Text><Text style={styles.quickPlus}>＋</Text></TouchableOpacity>
        <View style={styles.storyRow}><View style={styles.story}><Text style={styles.storyPlus}>＋</Text></View><Text style={styles.storyLabel}>Ajouter un statut</Text><View style={styles.story}><Text style={styles.storyInitial}>S</Text></View><Text style={styles.storyLabel}>SERTSHAPP</Text></View>
        {posts.map(p => <View key={p.id} style={styles.post}><View style={styles.postHead}><View style={styles.avatar}><Text style={styles.avatarText}>{p.name[0]}</Text></View><View style={{flex:1}}><Text style={styles.postName}>{p.name}</Text><Text style={styles.postMeta}>{p.handle} · {p.time}</Text></View><Text style={styles.more}>•••</Text></View><Text style={styles.postBody}>{p.body}</Text><View style={styles.mediaPlaceholder}><Text style={styles.mediaIcon}>▧</Text><Text style={styles.mediaText}>{p.type}</Text></View><View style={styles.postActions}><Text style={styles.action}>♡  {p.likes} J’aime</Text><Text style={styles.action}>◯  {p.comments} commentaires</Text><Text style={styles.action}>↗  Partager</Text></View></View>)}
      </ScrollView>}
      {tab === 'Publier' && <ScrollView contentContainerStyle={styles.content}><Text style={styles.pageTitle}>Créer une publication</Text><Text style={styles.muted}>Partage tes idées avec la communauté.</Text><TextInput style={[styles.input, styles.composer]} multiline placeholder="Qu’as-tu envie de partager ?" value={draft} onChangeText={setDraft}/><View style={styles.attachRow}><TouchableOpacity style={styles.attach} onPress={() => Alert.alert('Photos', 'La sélection de photos sera activée dans la version connectée.')}>▧  Photo</TouchableOpacity><TouchableOpacity style={styles.attach} onPress={() => Alert.alert('Vidéo', 'La sélection de vidéos sera activée dans la version connectée.')}>▷  Vidéo</TouchableOpacity><TouchableOpacity style={styles.attach} onPress={() => Alert.alert('Document', 'Le partage de documents sera activé dans la version connectée.')}>▤  Document</TouchableOpacity></View><TouchableOpacity style={styles.primary} onPress={publish}><Text style={styles.primaryText}>Publier</Text></TouchableOpacity></ScrollView>}
      {tab === 'Messages' && <View style={styles.content}><Text style={styles.pageTitle}>Messages</Text><Text style={styles.muted}>Tes conversations apparaîtront ici.</Text><View style={styles.empty}><Text style={styles.emptyIcon}>✉</Text><Text style={styles.postName}>Aucune conversation</Text><Text style={styles.muted}>La messagerie en temps réel sera connectée dans la prochaine étape.</Text></View></View>}
      {tab === 'Alertes' && <View style={styles.content}><Text style={styles.pageTitle}>Notifications</Text><View style={styles.empty}><Text style={styles.emptyIcon}>♡</Text><Text style={styles.postName}>Tu es à jour !</Text><Text style={styles.muted}>Tes réactions, commentaires et alertes apparaîtront ici.</Text></View></View>}
      {tab === 'Profil' && <View style={styles.content}><Text style={styles.pageTitle}>Mon profil</Text><View style={styles.profileCircle}><Text style={styles.profileLetter}>S</Text></View><Text style={styles.profileName}>Mon profil SERTSHAPP</Text><Text style={styles.muted}>Bienvenue dans la communauté.</Text><View style={styles.stats}><Text style={styles.stat}>0 {'\n'}Abonnés</Text><Text style={styles.stat}>0 {'\n'}Abonnements</Text><Text style={styles.stat}>{posts.length} {'\n'}Publications</Text></View><TouchableOpacity style={styles.secondary} onPress={() => setSignedIn(false)}><Text style={styles.secondaryText}>Se déconnecter</Text></TouchableOpacity></View>}
      <View style={styles.bottomNav}>{nav.map(([label, icon]) => <TouchableOpacity key={label} style={styles.navItem} onPress={() => setTab(label)}><Text style={[styles.navIcon, tab === label && styles.navSelected]}>{icon}</Text><Text style={[styles.navLabel, tab === label && styles.navSelected]}>{label}</Text></TouchableOpacity>)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#F5F8FD'}, hero:{backgroundColor:BLUE,alignItems:'center',paddingTop:48,paddingBottom:55,borderBottomLeftRadius:30,borderBottomRightRadius:30},logo:{width:74,height:74,borderRadius:23,backgroundColor:'#FFFFFF',alignItems:'center',justifyContent:'center'},logoLetter:{fontSize:46,fontWeight:'900',color:BLUE},brand:{fontSize:27,fontWeight:'900',color:'#FFFFFF',letterSpacing:1.5,marginTop:12},tagline:{color:'#DCEBFF',marginTop:5},authCard:{backgroundColor:'#FFFFFF',margin:20,marginTop:-25,borderRadius:22,padding:22,elevation:4},heading:{fontSize:25,fontWeight:'800',color:'#10233F'},muted:{fontSize:13,color:'#718096',marginTop:5,lineHeight:19},switchRow:{flexDirection:'row',backgroundColor:'#F0F5FC',padding:4,borderRadius:12,marginTop:22,marginBottom:15},switch:{flex:1,padding:11,alignItems:'center',borderRadius:9},switchActive:{backgroundColor:'#FFFFFF',elevation:2},switchText:{color:'#718096',fontWeight:'600'},switchTextActive:{color:BLUE},input:{backgroundColor:'#F6F8FC',borderWidth:1,borderColor:'#E4EAF3',borderRadius:12,padding:14,marginTop:12,color:'#10233F',minHeight:50},primary:{backgroundColor:BLUE,padding:15,borderRadius:12,alignItems:'center',marginTop:18},primaryText:{color:'#FFFFFF',fontWeight:'800',fontSize:15},link:{textAlign:'center',color:BLUE,fontWeight:'700',marginTop:18},smallNote:{fontSize:10,color:'#8A96A8',textAlign:'center',marginTop:18},topbar:{height:58,backgroundColor:'#FFFFFF',flexDirection:'row',alignItems:'center',paddingHorizontal:17,borderBottomWidth:1,borderBottomColor:'#EAF0F7'},miniLogo:{height:34,width:34,borderRadius:11,backgroundColor:BLUE,alignItems:'center',justifyContent:'center'},miniLogoText:{color:'#FFFFFF',fontSize:23,fontWeight:'900'},topBrand:{fontSize:18,fontWeight:'900',color:'#10233F',marginLeft:9,flex:1,letterSpacing:.5},bell:{fontSize:25,color:BLUE},content:{padding:17,paddingBottom:35},pageTitle:{fontSize:25,fontWeight:'900',color:'#10233F'},quickPost:{backgroundColor:'#FFFFFF',borderRadius:15,padding:15,marginTop:18,flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#E7EEF8'},quickText:{color:'#8793A4',flex:1},quickPlus:{color:BLUE,fontSize:25,fontWeight:'700'},storyRow:{flexDirection:'row',alignItems:'center',marginTop:20,marginBottom:10},story:{height:48,width:48,borderRadius:24,borderWidth:2,borderColor:BLUE,alignItems:'center',justifyContent:'center',backgroundColor:'#FFFFFF',marginRight:7},storyPlus:{fontSize:28,color:BLUE},storyInitial:{fontSize:20,color:BLUE,fontWeight:'800'},storyLabel:{fontSize:10,color:'#64748B',marginRight:14},post:{backgroundColor:'#FFFFFF',borderRadius:17,padding:15,marginTop:12,borderWidth:1,borderColor:'#EAF0F7'},postHead:{flexDirection:'row',alignItems:'center'},avatar:{height:40,width:40,borderRadius:20,backgroundColor:PALE,alignItems:'center',justifyContent:'center',marginRight:10},avatarText:{fontSize:18,color:BLUE,fontWeight:'800'},postName:{fontWeight:'800',color:'#172B4D'},postMeta:{fontSize:11,color:'#8995A6',marginTop:3},more:{color:'#7B8798',fontWeight:'900'},postBody:{color:'#334155',fontSize:14,lineHeight:21,marginTop:14},mediaPlaceholder:{height:135,backgroundColor:'#EEF5FF',borderRadius:12,marginTop:13,alignItems:'center',justifyContent:'center'},mediaIcon:{fontSize:34,color:'#7AADEB'},mediaText:{fontSize:11,color:'#7091B9',marginTop:5},postActions:{flexDirection:'row',justifyContent:'space-between',marginTop:14},action:{fontSize:11,color:'#607086'},composer:{height:180,textAlignVertical:'top',paddingTop:15},attachRow:{flexDirection:'row',justifyContent:'space-between',marginTop:14},attach:{backgroundColor:PALE,padding:11,borderRadius:10,color:BLUE,fontSize:12},empty:{alignItems:'center',marginTop:100,paddingHorizontal:20},emptyIcon:{fontSize:48,color:BLUE,marginBottom:15},profileCircle:{height:90,width:90,borderRadius:45,backgroundColor:PALE,alignItems:'center',justifyContent:'center',alignSelf:'center',marginTop:35},profileLetter:{fontSize:40,color:BLUE,fontWeight:'900'},profileName:{fontSize:18,fontWeight:'800',color:'#172B4D',textAlign:'center',marginTop:14},stats:{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#FFFFFF',padding:18,borderRadius:14,marginTop:25},stat:{textAlign:'center',color:'#334155',fontWeight:'700',lineHeight:23},secondary:{borderWidth:1,borderColor:BLUE,padding:14,borderRadius:12,alignItems:'center',marginTop:25},secondaryText:{color:BLUE,fontWeight:'800'},bottomNav:{height:67,backgroundColor:'#FFFFFF',borderTopWidth:1,borderTopColor:'#E8EEF6',flexDirection:'row',justifyContent:'space-around',alignItems:'center'},navItem:{alignItems:'center',justifyContent:'center',flex:1},navIcon:{fontSize:23,color:'#8A98AA'},navLabel:{fontSize:10,color:'#8A98AA',marginTop:2},navSelected:{color:BLUE,fontWeight:'900'}
});
